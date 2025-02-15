import { Coupon } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation, useQuery } from 'react-query';

type ResultBody = {
  success: boolean;
  message?: string;
  data: Coupon;
};

type CouponVariables = {
  code: string;
};

async function applyCoupon(variables: CouponVariables): Promise<ResultBody> {
  const { data } = await http.get(
    `${API_ENDPOINTS.COUPON_BYCODE}?coupon_code=${variables.code}`
  );
  return data;
}

export const useApplyCouponMutation = () => {
  return useMutation<ResultBody, Error, CouponVariables>(
    (variables) => applyCoupon(variables),
    {
      onError: (error) => {
        console.error('Error applying coupon:', error);
      },
    }
  );
};
