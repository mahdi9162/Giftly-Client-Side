'use client';

import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, CreditCard, PackageCheck, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

type OrderActionCellProps = {
  initialStatus?: OrderStatus;
  initialPaymentStatus?: PaymentStatus;
  orderId: string;
};

type Order = {
  _id: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
};

type OrdersQueryResponse = {
  data: {
    data: Order[];
  };
};

const OrderActionCell = ({ initialStatus = 'pending', initialPaymentStatus = 'pending', orderId }: OrderActionCellProps) => {
  const status = initialStatus;
  const paymentStatus = initialPaymentStatus;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStatus: OrderStatus) => axiosInstance.patch(`/admin/orders/${orderId}`, { orderStatus: newStatus }),

    onSuccess: (res) => {
      const updatedOrder = res.data.data;

      queryClient.setQueriesData({ queryKey: ['orders'] }, (oldData: OrdersQueryResponse | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: oldData.data.data.map((order: Order) => (order._id === updatedOrder._id ? updatedOrder : order)),
          },
        };
      });

      toast.success('Order status updated successfully');
    },

    onError: () => {
      toast.error('Failed to update order status');
    },
  });

  const handleUpdateOrder = (newOrderStatus?: OrderStatus) => {
    if (newOrderStatus) {
      mutation.mutate(newOrderStatus);
    }
  };

  const handleConfirm = () => {
    handleUpdateOrder('processing');
  };

  const handleShip = () => {
    handleUpdateOrder('shipped');
  };

  const handleDeliver = () => {
    handleUpdateOrder('delivered');
  };

  const handleCodPaidAndDeliver = () => {
    handleUpdateOrder('delivered');
  };

  return (
    <div className="flex flex-wrap justify-end gap-2">
      {status === 'pending' && (
        <button
          onClick={handleConfirm}
          className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-medium text-violet-600 transition hover:bg-violet-100"
        >
          <CheckCircle2 className="h-4 w-4" />
          Confirm
        </button>
      )}

      {status === 'processing' && (
        <button
          onClick={handleShip}
          className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-medium text-sky-600 transition hover:bg-sky-100"
        >
          <Truck className="h-4 w-4" />
          Ship Order
        </button>
      )}

      {status === 'shipped' && paymentStatus === 'pending' && (
        <button
          onClick={handleCodPaidAndDeliver}
          className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100"
        >
          <CreditCard className="h-4 w-4" />
          COD Paid & Deliver
        </button>
      )}

      {status === 'shipped' && paymentStatus === 'paid' && (
        <button
          onClick={handleDeliver}
          className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100"
        >
          <PackageCheck className="h-4 w-4" />
          Deliver
        </button>
      )}

      {status === 'delivered' && (
        <span className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          Completed
        </span>
      )}

      {status === 'cancelled' && (
        <span className="inline-flex items-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">
          Cancelled
        </span>
      )}
    </div>
  );
};

export default OrderActionCell;
