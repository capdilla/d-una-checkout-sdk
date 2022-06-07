export interface InstallmentsResponse {
    installments: Installment[];
}
export interface Installment {
    installments: number;
    installments_amount: number;
    display_installments_amount: string;
    installment_rate: number;
    display_installment_rate: string;
    discount_rate: number;
    installment_rate_collector: string[];
}
