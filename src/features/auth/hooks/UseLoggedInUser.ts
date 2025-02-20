import { useQuery } from "@tanstack/react-query";
import { customerService, staffService } from "../../../services";

export function useLoggedInCustomer() {
  const { data, isLoading } = useQuery({
    queryKey: ["customer", "logged-in"],
    queryFn: customerService.getLoggedInCustomer,
  });
  if (data?.success) {
    return { user: data?.payload, isLoading };
  } else {
    return { user: undefined, isLoading };
  }
}

export function useLoggedInStaff() {
  const { data, isLoading } = useQuery({
    queryKey: ["staff", "logged-in"],
    queryFn: staffService.getLoggedInStaff,
  });
  if (data?.success) {
    return { user: data?.payload, isLoading };
  } else {
    return { user: undefined, isLoading };
  }
}
