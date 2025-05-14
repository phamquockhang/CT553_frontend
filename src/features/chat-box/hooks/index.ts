import { useMutation, useQuery } from "@tanstack/react-query";
import { conversationService, staffService } from "../../../services";

export const useStaffInfomation = (staffId: string) => {
  const { data: getUserInfomation } = useQuery({
    queryKey: ["staff", staffId],
    queryFn: () => staffService.getStaffById(staffId!),
    select: (data) => data.payload,
    enabled: !!staffId,
  });

  return {
    getUserInfomation,
  };
};

export const useGetStaffByEmail = (staffEmail: string) => {
  const { data: getStaffByEmail } = useQuery({
    queryKey: ["staff", staffEmail],
    queryFn: () => staffService.getStaffByEmail(staffEmail),
    select: (data) => data.payload,
    enabled: !!staffEmail,
  });

  return {
    getStaffByEmail,
  };
};

export const useCreateConversation = () => {
  const { mutate: createConversation } = useMutation({
    mutationFn: ({
      participantId1,
      participantId2,
    }: {
      participantId1: string;
      participantId2: string;
    }) =>
      conversationService.createConversation(participantId1, participantId2),
  });
  return {
    createConversation,
  };
};
