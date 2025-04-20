import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Empty, List, message, Spin } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IConversation } from "../../interfaces";
import ConversationItem from "./ConversationItem";
import { useCreateConversation, useGetStaffByEmail } from "./hooks";

dayjs.extend(relativeTime);

interface ConversationListProps {
  conversationData: IConversation[] | undefined;
  isLoadingConversations: boolean;
  error: Error | null;
  participantId: string | undefined;
  setVisible: (visible: boolean) => void;
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<IConversation | undefined>
  >;
  refetch: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversationData,
  isLoadingConversations,
  error,
  participantId,
  setVisible,
  setSelectedConversation,
  refetch,
}) => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { createConversation } = useCreateConversation();
  const { getStaffByEmail } = useGetStaffByEmail("supporter@gmail.com");

  useEffect(() => {
    console.log("conversationData updated: ", conversationData);
    if (conversationData) {
      const filteredAndSortedConversations = conversationData
        // .filter((conversation) => conversation.lastMessageContent)
        .sort((a, b) => {
          const aDate = dayjs(a.updatedAt);
          const bDate = dayjs(b.updatedAt);
          return bDate.isAfter(aDate) ? 1 : -1;
        });
      setConversations(filteredAndSortedConversations);
    } else {
      setConversations([]);
    }
    console.log("Conversations updated: ", conversations);
  }, [conversationData]);

  const handleCreateNewChat = async () => {
    if (!participantId) {
      message.error("Bạn cần đăng nhập để tạo cuộc trò chuyện mới!");
      return;
    }

    try {
      const participantId2 = getStaffByEmail?.staffId || "";
      if (!participantId2) {
        message.error("Không tìm thấy nhân viên hỗ trợ!");
        return;
      }

      await createConversation(
        {
          participantId1: participantId,
          participantId2,
        },
        {
          onSuccess: (response) => {
            console.log("Tạo cuộc trò chuyện thành công:", response);
            // Tự động chọn cuộc trò chuyện mới
            setSelectedConversation(response.payload);
            // Gọi refetch để làm mới conversationData
            refetch();
            message.success("Đã tạo cuộc trò chuyện mới!");
          },
          onError: (error) => {
            console.error("Lỗi khi tạo cuộc trò chuyện:", error);
            message.error("Không thể tạo cuộc trò chuyện. Vui lòng thử lại!");
          },
        },
      );
    } catch (err) {
      console.error("Lỗi khi tạo cuộc trò chuyện:", err);
      message.error("Không thể tạo cuộc trò chuyện. Vui lòng thử lại!");
    }
  };

  return (
    <Card
      title="Danh sách trò chuyện"
      className="mx-auto mt-2 w-full max-w-2xl rounded-2xl shadow-lg"
      extra={
        <div
          className="cursor-pointer p-1 transition-opacity hover:opacity-80"
          onClick={() => setVisible(false)}
        >
          <IoCloseOutline className="text-xl text-gray-600" />
        </div>
      }
    >
      <div className="scrollbar-thin scrollbar-thumb-gray-300 h-[415.6px] overflow-y-auto">
        {participantId == null ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Empty
              image={
                <UserOutlined style={{ fontSize: 40, color: "#1890ff" }} />
              }
              description={
                <div className="flex flex-col items-center">
                  <span
                    style={{ color: "#f5222d", fontSize: 16, fontWeight: 500 }}
                  >
                    Mời đăng nhập để sử dụng chức năng này
                  </span>
                  <Button
                    type="primary"
                    style={{ marginTop: 16 }}
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                  >
                    Đăng nhập
                  </Button>
                </div>
              }
            />
          </motion.div>
        ) : isLoadingConversations ? (
          <div className="flex h-full items-center justify-center">
            <Spin tip="Đang tải..." />
          </div>
        ) : error ? (
          <Empty description="Lỗi khi tải danh sách trò chuyện" />
        ) : conversations.length === 0 ? (
          <Empty
            description={
              <div className="flex flex-col items-center">
                <span style={{ fontSize: 16, color: "#595959" }}>
                  Chưa có cuộc trò chuyện nào
                </span>
                <Button
                  type="primary"
                  style={{ marginTop: 16 }}
                  onClick={handleCreateNewChat}
                >
                  Tạo đoạn chat mới
                </Button>
              </div>
            }
          />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={conversations}
            renderItem={(conversation) => (
              <ConversationItem
                conversation={conversation}
                participantId={participantId}
                onSelect={setSelectedConversation}
              />
            )}
          />
        )}
      </div>
    </Card>
  );
};

export default ConversationList;
