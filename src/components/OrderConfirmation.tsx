"use client";

import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileDown, CheckCircle2, ArrowRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CartItem } from '@/lib/types';
import Link from 'next/link';

interface OrderData {
    orderId: string;
    date: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        pincode: string;
    };
    items: CartItem[];
    total: number;
    savings: number;
    coupon?: string;
}

interface OrderConfirmationProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderData: OrderData | null;
    onClose: () => void;
}

export function OrderConfirmation({ open, onOpenChange, orderData, onClose }: OrderConfirmationProps) {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    if (!orderData) return null;

    const handleDownloadInvoice = async () => {
        if (!invoiceRef.current) return;
        try {
            setIsGenerating(true);
            // Temporarily make the hidden invoice visible for canvas rendering
            invoiceRef.current.style.display = 'block';

            const canvas = await html2canvas(invoiceRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            invoiceRef.current.style.display = 'none';

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Invoice_${orderData.orderId}.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF invoice:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleModalClose = (isOpen: boolean) => {
        if (!isOpen) {
            onClose();
        }
        onOpenChange(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleModalClose}>
            <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-none shadow-2xl p-8 bg-background text-center flex flex-col items-center">

                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>

                <DialogHeader className="text-center w-full sm:text-center flex flex-col items-center">
                    <DialogTitle className="font-display text-2xl font-black uppercase tracking-tight text-foreground">
                        Order Initiated!
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground font-light text-[11px] uppercase tracking-widest mt-2 max-w-[280px]">
                        Your WhatsApp request has been opened.
                        <br /><br />
                        Order ID: <span className="font-bold text-foreground">{orderData.orderId}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full bg-primary/5 rounded-2xl p-5 my-6 text-left space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 border-b border-primary/10 pb-2">Order Summary</p>
                    <div className="max-h-[100px] overflow-y-auto scrollbar-hide space-y-2">
                        {orderData.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-[11px] font-bold uppercase tracking-wide">
                                <span className="text-foreground/70 truncate pr-4">{item.name} x{item.quantity}</span>
                                <span>₹{item.sale_price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm font-black uppercase tracking-widest text-primary pt-2 border-t border-primary/10">
                        <span>Total</span>
                        <span>₹{orderData.total}</span>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-3">
                    <Button
                        onClick={handleDownloadInvoice}
                        disabled={isGenerating}
                        className="w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-bold text-[10px] uppercase tracking-[0.2em] transition-all"
                    >
                        <FileDown className="mr-2 h-4 w-4" />
                        {isGenerating ? 'Generating...' : 'Download Invoice (PDF)'}
                    </Button>

                    <Button
                        onClick={() => handleModalClose(false)}
                        variant="outline"
                        className="w-full h-14 rounded-2xl border-primary/10 font-bold text-[10px] uppercase tracking-[0.2em] transition-all"
                    >
                        Continue Shopping
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>

            {/* Hidden Invoice Template for PDF Generation */}
            <div
                ref={invoiceRef}
                style={{ display: 'none', width: '800px', padding: '60px', backgroundColor: 'white', color: 'black', fontFamily: 'sans-serif' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #f0f0f0', paddingBottom: '30px', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 10px 0' }}>Sumegha Handmades</h1>
                        <p style={{ color: '#666', fontSize: '12px', margin: 0, letterSpacing: '1px' }}>Crafted with love, shipped with care.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#db2777', margin: '0 0 5px 0', textTransform: 'uppercase' }}>Invoice</h2>
                        <p style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: 'bold' }}>Order ID: {orderData.orderId}</p>
                        <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Date: {orderData.date}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '40px', marginBottom: '50px' }}>
                    <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '15px' }}>
                        <h3 style={{ textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '12px', color: '#888', marginBottom: '15px', marginTop: 0 }}>Billed To:</h3>
                        <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '0 0 8px 0' }}>{orderData.customer.name}</p>
                        <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#444' }}>{orderData.customer.email}</p>
                        <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#444' }}>{orderData.customer.phone}</p>
                        <p style={{ margin: '0', fontSize: '14px', color: '#444', lineHeight: '1.5' }}>
                            {orderData.customer.address}<br />
                            Pincode: {orderData.customer.pincode}
                        </p>
                    </div>
                    <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '15px' }}>
                        <h3 style={{ textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '12px', color: '#888', marginBottom: '15px', marginTop: 0 }}>Payment Status:</h3>
                        <p style={{ fontWeight: 'bold', fontSize: '18px', margin: '0 0 10px 0', color: '#ea580c' }}>Pending (WhatsApp)</p>
                        <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: 0 }}>
                            Payment to be collected via UPI/Transfer during WhatsApp order confirmation.
                        </p>
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '15px', borderBottom: '2px solid #eee', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>Item Description</th>
                            <th style={{ textAlign: 'center', padding: '15px', borderBottom: '2px solid #eee', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>Price</th>
                            <th style={{ textAlign: 'center', padding: '15px', borderBottom: '2px solid #eee', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>Qty</th>
                            <th style={{ textAlign: 'right', padding: '15px', borderBottom: '2px solid #eee', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.items.map((item, idx) => (
                            <tr key={idx}>
                                <td style={{ padding: '20px 15px', borderBottom: '1px solid #f5f5f5', fontWeight: 'bold' }}>{item.name}</td>
                                <td style={{ textAlign: 'center', padding: '20px 15px', borderBottom: '1px solid #f5f5f5', color: '#555' }}>INR {item.sale_price}</td>
                                <td style={{ textAlign: 'center', padding: '20px 15px', borderBottom: '1px solid #f5f5f5', color: '#555' }}>{item.quantity}</td>
                                <td style={{ textAlign: 'right', padding: '20px 15px', borderBottom: '1px solid #f5f5f5', fontWeight: 'bold' }}>INR {item.sale_price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '350px', backgroundColor: '#fdf2f8', padding: '30px', borderRadius: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px', color: '#666' }}>
                            <span>Subtotal</span>
                            <span>INR {orderData.total + (orderData.coupon ? Math.round(orderData.total / 0.9 * 0.1) : 0)}</span>
                        </div>

                        {orderData.coupon && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px', color: '#16a34a' }}>
                                <span>Discount ({orderData.coupon})</span>
                                <span>- INR {Math.round(orderData.total / 0.9 * 0.1)}</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                            <span>Shipping</span>
                            <span style={{ color: '#16a34a', fontWeight: 'bold' }}>FREE</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #fbcfe8', paddingTop: '20px', fontSize: '24px', fontWeight: '900', color: '#db2777' }}>
                            <span>Total</span>
                            <span>INR {orderData.total}</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '80px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '30px', color: '#888', fontSize: '12px' }}>
                    <p style={{ margin: '0 0 5px 0' }}>Thank you for shopping with Sumegha Handmades!</p>
                    <p style={{ margin: 0 }}>If you have any questions about this invoice, please contact us on WhatsApp.</p>
                </div>
            </div>

        </Dialog>
    );
}
