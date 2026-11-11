import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CheckoutForm } from '@/modules/cart/components/CheckoutForm';
import { CartProvider } from '@/modules/cart/context/CartContext';
import { ToastProvider } from '@/shared/components/Toast/ToastContext';

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ToastProvider>
      <CartProvider>{ui}</CartProvider>
    </ToastProvider>,
  );
}

describe('CheckoutForm Component', () => {
  it('submitting empty required fields must display validation error alerts for required inputs', () => {
    const handleSubmit = vi.fn();
    renderWithProviders(<CheckoutForm onSubmitOrder={handleSubmit} />);

    // Find submit button by role
    const submitButton = screen.getByRole('button', { name: /تأكيد وإتمام الطلب/i });
    fireEvent.click(submitButton);

    // Assert that validation alerts appear for invalid/empty inputs
    const alerts = screen.getAllByRole('alert');
    expect(alerts.length).toBeGreaterThan(0);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('submitting valid customer details must invoke onSubmitOrder callback with customer payload', () => {
    const handleSubmit = vi.fn();
    renderWithProviders(<CheckoutForm onSubmitOrder={handleSubmit} />);

    // Find inputs by their label text
    const nameInput = screen.getByLabelText(/الاسم الثلاثي/i);
    const phoneInput = screen.getByLabelText(/رقم الجوال للتواصل/i);
    const cityInput = screen.getByLabelText(/المدينة والعنوان التفصيلي/i);
    const paymentSelect = screen.getByRole('combobox', { name: /وسيلة الدفع المفضلة/i });

    // Fill valid inputs
    fireEvent.change(nameInput, { target: { value: 'محمد أحمد السالم' } });
    fireEvent.change(phoneInput, { target: { value: '0501234567' } });
    fireEvent.change(cityInput, { target: { value: 'الرياض، حي الملقا' } });
    fireEvent.change(paymentSelect, { target: { value: 'cod' } });

    // Submit form via button found by role
    const submitButton = screen.getByRole('button', { name: /تأكيد وإتمام الطلب/i });
    fireEvent.click(submitButton);

    // Verify callback was invoked with the exact data
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      customerName: 'محمد أحمد السالم',
      customerPhone: '0501234567',
      customerCity: 'الرياض، حي الملقا',
      paymentMethod: 'cod',
    });
  });
});

