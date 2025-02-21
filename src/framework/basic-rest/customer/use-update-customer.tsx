import { useMutation } from 'react-query';

export interface UpdateUserType {
  user_fname: string;
  user_lname: string;
  user_phone: string | number;
  user_email: string;
}
async function updateUser(input: UpdateUserType) {
  return input;
}
export const useUpdateUserMutation = () => {
  return useMutation((input: UpdateUserType) => updateUser(input), {
    onSuccess: (data) => {
      console.log(data, 'UpdateUser success response');
    },
    onError: (data) => {
      console.log(data, 'UpdateUser error response');
    },
  });
};
