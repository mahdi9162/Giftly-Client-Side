'use client';

import { useState } from 'react';
import { CheckCircle2, BadgeDollarSign, Truck } from 'lucide-react';

type OrderStatus = 'Pending' | 'Processing' | 'Delivered';
type PaymentStatus = 'Unpaid' | 'Paid';

type OrderActionCellProps = {
  initialStatus?: OrderStatus;
  initialPaymentStatus?: PaymentStatus;
};

const OrderActionCell = ({ initialStatus = 'Pending', initialPaymentStatus = 'Unpaid' }: OrderActionCellProps) => {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(initialPaymentStatus);

  const handleConfirm = () => {
    setStatus('Processing');
  };

  const handleMarkPaid = () => {
    setPaymentStatus('Paid');
  };

  const handleDeliver = () => {
    setStatus('Delivered');
  };

  return (
    <div className="flex flex-wrap justify-end gap-2">
      {status === 'Pending' && (
        <button
          onClick={handleConfirm}
          className="inline-flex items-center gap-1 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-medium text-violet-600 transition hover:bg-violet-100"
        >
          <CheckCircle2 className="h-4 w-4" />
          Confirm
        </button>
      )}

      {status === 'Processing' && paymentStatus === 'Unpaid' && (
        <button
          onClick={handleMarkPaid}
          className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100"
        >
          <BadgeDollarSign className="h-4 w-4" />
          Mark as Paid
        </button>
      )}

      {status === 'Processing' && paymentStatus === 'Paid' && (
        <button
          onClick={handleDeliver}
          className="inline-flex items-center gap-1 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-medium text-sky-600 transition hover:bg-sky-100"
        >
          <Truck className="h-4 w-4" />
          Deliver
        </button>
      )}

      {status === 'Delivered' && (
        <span className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600">
          Completed
        </span>
      )}
    </div>
  );
};

export default OrderActionCell;
