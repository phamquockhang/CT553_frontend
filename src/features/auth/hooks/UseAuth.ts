import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  ApiResponse,
  IAuthRequest,
  IAuthResponse,
  ICustomer,
} from "../../../interfaces";
import { authService } from "../../../services";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: (authRequest: IAuthRequest) => authService.login(authRequest),
    onSuccess: (data: ApiResponse<IAuthResponse>) => {
      if (data.payload) {
        const { accessToken } = data.payload;
        window.localStorage.setItem("access_token", accessToken);
        navigate("/");
      }
    },
    onError: (error: unknown) => {
      console.error("Login error:", error);
    },
  });
  return { login, isLoading };
};

export const useRegister = () => {
  const { mutate: register, isPending: isLoading } = useMutation({
    mutationFn: (user: Omit<ICustomer, "customerId">) =>
      authService.registerCustomer(user),
    onSuccess: () => {},
    onError: (error: unknown) => {
      console.error("Register error:", error);
    },
  });
  return { register, isLoading };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("customer");
      queryClient.removeQueries({
        predicate: (query) => {
          return query.queryKey.includes(["customer", "logged-in"]);
        },
      });
      navigate("/");
    },
    onError: (error: unknown) => {
      console.error("Logout error:", error);
    },
  });
  return { logout };
};
