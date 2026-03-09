"use client";

import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileDown, CheckCircle2, ArrowRight, Sparkles, Clock, QrCode } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CartItem } from '@/lib/types';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

// ============================================================
// 🔧 CONFIGURABLE SECTION — Change these values as needed
// ============================================================

// ➡️ DELIVERY TIME: Change the text to update estimated delivery
const APPROX_DELIVERY_DAYS = '5-7 business days';

// ➡️ BUSINESS NAME: Shown on invoice header & footer
const BUSINESS_NAME = 'Sumegha Handmades';

// ➡️ BUSINESS ADDRESS: Shown on invoice "From" section & footer
const BUSINESS_ADDRESS = 'Sagar, Madhya Pradesh, 470002';

// ➡️ BUSINESS PHONE: Shown on invoice & made clickable (tel: link)
const BUSINESS_PHONE = '+918234009618';

// ➡️ BUSINESS EMAIL: Shown on invoice "From" section & footer
const BUSINESS_EMAIL = 'hello@sumeghahandmades.com';

// ➡️ BUSINESS WEBSITE: Shown on invoice "From" section
const BUSINESS_WEBSITE = 'www.sumeghahandmades.com';

// ➡️ LOGO URL: Using an absolute URL works better for html2canvas to fetch the image.
// Try hosting your logo and pasting the https:// URL here instead of a local path.
const BUSINESS_LOGO_PATH = 'https://i.ibb.co/6nd5ZZV/logo.png'; // Example fallback, update me

// ➡️ TAGLINE: Shown below business name on invoice
const BUSINESS_TAGLINE = 'Crafted with love, shipped with care.';

// ➡️ UPI PAYMENT DETAILS: Fixed exact-amount payment
const ENABLE_QR_PAYMENT = true; // Set to false to hide the QR code payment block
const BUSINESS_UPI_ID = '7000216694@paytm'; // Change to your actual UPI ID
const BUSINESS_PAYEE_NAME = 'Sumegha Handmades';

// ============================================================
// END OF CONFIGURABLE SECTION
// ============================================================

interface OrderData {
    orderId: string;
    date: string;
    time?: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        pincode: string;
        shippingAddress?: string;
        shippingPincode?: string;
        sameAsShipping?: boolean;
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

// Generate a SKU from product name (Using standard function, but we use Product ID in UI)
function generateSKU(name: string, index: number): string {
    const slug = name
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 8);
    return `SH-${slug}-${String(index + 1).padStart(3, '0')}`;
}

export function OrderConfirmation({ open, onOpenChange, orderData, onClose }: OrderConfirmationProps) {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    if (!orderData) return null;

    const orderTime = orderData.time || new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Exact amount payment intent URL
    const upiIntentUrl = `upi://pay?pa=${BUSINESS_UPI_ID}&pn=${encodeURIComponent(BUSINESS_PAYEE_NAME)}&am=${orderData.total}&cu=INR&tn=${encodeURIComponent(`Order ${orderData.orderId}`)}`;

    const handleDownloadInvoice = async () => {
        if (!invoiceRef.current) return;
        try {
            setIsGenerating(true);
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

    const showShippingAddress = orderData.customer.sameAsShipping === false;

    return (
        <Dialog open={open} onOpenChange={handleModalClose}>
            {/* Responsive: landscape on desktop, compact on mobile */}
            <DialogContent className="sm:max-w-[450px] md:max-w-[750px] rounded-[2.5rem] border-none shadow-2xl p-0 bg-background text-center overflow-hidden max-h-[85vh] md:max-h-none">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">

                    {/* Left: Success Info */}
                    <div className="flex flex-col items-center justify-center p-5 md:p-8">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 rounded-full flex items-center justify-center mb-3 md:mb-4">
                            <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-green-600" />
                        </div>

                        <DialogHeader className="text-center w-full sm:text-center flex flex-col items-center">
                            <DialogTitle className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-foreground">
                                Order Initiated!
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground font-light text-[11px] uppercase tracking-widest mt-2 max-w-[280px]">
                                Your WhatsApp request has been opened.
                                <br /><br />
                                Order ID: <span className="font-bold text-foreground">{orderData.orderId}</span>
                            </DialogDescription>
                        </DialogHeader>

                        {/* You Saved Amount */}
                        {orderData.savings > 0 && (
                            <div className="w-full p-3 md:p-4 bg-green-50 rounded-2xl border border-green-100 flex justify-between items-center mt-4">
                                <span className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center">
                                    <Sparkles className="h-3 w-3 mr-2 animate-pulse" />
                                    You Saved
                                </span>
                                <span className="font-black text-green-700 text-lg">₹{orderData.savings}</span>
                            </div>
                        )}

                        {/* Direct Fixed Amount UPI Payment */}
                        <div className="w-full mt-4 p-4 md:p-5 bg-primary/5 rounded-[1.5rem] border border-primary/10 flex flex-col items-center text-center">
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5 mb-1">
                                <QrCode className="h-4 w-4" />
                                Pay Exact Amount Now
                            </h4>
                            <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest mb-3">
                                Scan OR click to pay exactly ₹{orderData.total}
                            </p>

                            <div className="bg-white p-2.5 rounded-[1rem] border border-primary/20 shadow-sm inline-block">
                                <QRCodeSVG value={upiIntentUrl} size={110} />
                            </div>

                            <Button
                                className="w-full mt-4 h-11 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-[10px] uppercase tracking-[0.1em] shadow-lg shadow-green-500/20 transition-all"
                                onClick={() => window.open(upiIntentUrl, '_blank')}
                            >
                                Open UPI App to Pay ₹{orderData.total}
                            </Button>
                        </div>

                        {/* Approximate Delivery Time */}
                        <div className="w-full p-3 md:p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3 mt-4">
                            <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            <div className="text-left">
                                <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Estimated Delivery</p>
                                <p className="text-sm font-bold text-blue-900 mt-0.5">{APPROX_DELIVERY_DAYS}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary + Actions */}
                    <div className="bg-primary/[0.03] p-5 md:p-8 border-t md:border-t-0 md:border-l border-primary/5 flex flex-col justify-between">
                        <div className="w-full bg-primary/5 rounded-2xl p-4 md:p-5 text-left space-y-3">
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

                        <div className="flex flex-col w-full gap-3 mt-4 md:mt-6">
                            <Button
                                onClick={handleDownloadInvoice}
                                disabled={isGenerating}
                                className="w-full h-12 md:h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-bold text-[10px] uppercase tracking-[0.2em] transition-all"
                            >
                                <FileDown className="mr-2 h-4 w-4" />
                                {isGenerating ? 'Generating...' : 'Download Invoice (PDF)'}
                            </Button>

                            <Button
                                onClick={() => handleModalClose(false)}
                                variant="outline"
                                className="w-full h-12 md:h-14 rounded-2xl border-primary/10 font-bold text-[10px] uppercase tracking-[0.2em] transition-all"
                            >
                                Continue Shopping
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>

            {/* ============================================================ */}
            {/* 📄 HIDDEN INVOICE TEMPLATE — This generates the PDF          */}
            {/* To change the look of the PDF, edit the styles below.        */}
            {/* Business details come from the CONFIGURABLE SECTION above.   */}
            {/* ============================================================ */}
            <div
                ref={invoiceRef}
                style={{
                    display: 'none',
                    width: '800px',
                    padding: '60px',
                    backgroundColor: 'white',
                    color: 'black',
                    fontFamily: '"Montserrat", "Segoe UI", sans-serif'
                }}
            >
                {/* Embed Montserrat font for PDF rendering */}
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');`}</style>

                {/* ➡️ INVOICE HEADER: Centered Logo + Business Name + Invoice Title */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '2px solid #f0f0f0', paddingBottom: '30px', marginBottom: '40px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                        {/* ➡️ LOGO: Center aligned. If image doesn't load in PDF, use an absolute URL */}
                        <img
                            src={BUSINESS_LOGO_PATH}
                            alt={BUSINESS_NAME}
                            style={{ maxWidth: '140px', maxHeight: '100px', objectFit: 'contain' }}
                            crossOrigin="anonymous"
                        />
                        <div>
                            <h1 style={{ fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 8px 0', fontFamily: '"Montserrat", sans-serif', color: '#111' }}>{BUSINESS_NAME}</h1>
                            <p style={{ color: '#666', fontSize: '12px', margin: 0, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}>{BUSINESS_TAGLINE}</p>
                        </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px' }}>
                        <div style={{ textAlign: 'left' }}>
                            <p style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: 700, fontFamily: '"Montserrat", sans-serif' }}>Order ID: {orderData.orderId}</p>
                            {/* ➡️ DATE & TIME: Auto-generated from order placement */}
                            <p style={{ color: '#666', margin: 0, fontSize: '14px', fontFamily: '"Montserrat", sans-serif', fontWeight: 500 }}>Date: {orderData.date} | Time: {orderTime}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h2 style={{ fontSize: '38px', fontWeight: '900', color: '#db2777', margin: 0, textTransform: 'uppercase', fontFamily: '"Montserrat", sans-serif' }}>Invoice</h2>
                        </div>
                    </div>
                </div>

                {/* ➡️ CUSTOMER & BUSINESS INFO SECTION */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '50px', flexWrap: 'wrap' }}>
                    {/* ➡️ BILLING ADDRESS: Comes from checkout form */}
                    <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '15px' }}>
                        <h3 style={{ textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '12px', color: '#888', marginBottom: '15px', marginTop: 0, fontFamily: '"Montserrat", sans-serif', fontWeight: 700 }}>Billed To:</h3>
                        <p style={{ fontWeight: 700, fontSize: '16px', margin: '0 0 8px 0', fontFamily: '"Montserrat", sans-serif' }}>{orderData.customer.name}</p>
                        <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#444', fontFamily: '"Montserrat", sans-serif', fontWeight: 500 }}>{orderData.customer.email}</p>
                        {/* ➡️ CUSTOMER PHONE: Clickable callto: link */}
                        <p style={{ margin: '0 0 5px 0', fontSize: '14px', fontFamily: '"Montserrat", sans-serif', fontWeight: 500 }}>
                            <a href={`callto:+91${orderData.customer.phone}`} style={{ color: '#2563eb', textDecoration: 'none' }}>+91 {orderData.customer.phone}</a>
                        </p>
                        <p style={{ margin: '0', fontSize: '14px', color: '#444', lineHeight: '1.5', fontFamily: '"Montserrat", sans-serif', fontWeight: 500 }}>
                            {orderData.customer.address}<br />
                            Pincode: {orderData.customer.pincode}
                        </p>
                    </div>

                    {/* ➡️ SHIPPING ADDRESS: Only shown if different from billing */}
                    {showShippingAddress && (
                        <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#eef7ff', padding: '25px', borderRadius: '15px' }}>
                            <h3 style={{ textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '12px', color: '#3b82f6', marginBottom: '15px', marginTop: 0, fontFamily: '"Montserrat", sans-serif', fontWeight: 700 }}>Ship To:</h3>
                            <p style={{ margin: '0', fontSize: '14px', color: '#444', lineHeight: '1.5', fontFamily: '"Montserrat", sans-serif', fontWeight: 500 }}>
                                {orderData.customer.shippingAddress}<br />
                                Pincode: {orderData.customer.shippingPincode}
                            </p>
                        </div>
                    )}

                    {/* ➡️ BUSINESS INFO: Change constants at top of this file */}
                    <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '15px' }}>
                        <h3 style={{ textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '12px', color: '#888', marginBottom: '15px', marginTop: 0, fontFamily: '"Montserrat", sans-serif', fontWeight: 700 }}>From:</h3>
                        <p style={{ fontWeight: 700, fontSize: '16px', margin: '0 0 8px 0', fontFamily: '"Montserrat", sans-serif' }}>{BUSINESS_NAME}</p>
                        <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#444', lineHeight: '1.6', fontFamily: '"Montserrat", sans-serif', fontWeight: 500 }}>{BUSINESS_ADDRESS}</p>
                        {/* ➡️ BUSINESS PHONE: Clickable callto: link */}
                        <p style={{ margin: '0 0 3px 0', fontSize: '13px', fontFamily: '"Montserrat", sans-serif', fontWeight: 500 }}>
                            Phone: <a href={`callto:${BUSINESS_PHONE}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{BUSINESS_PHONE}</a>
                        </p>
                        <p style={{ margin: '0 0 3px 0', fontSize: '13px', color: '#444', fontFamily: '"Montserrat", sans-serif', fontWeight: 500 }}>
                            Email: <a href={`mailto:${BUSINESS_EMAIL}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{BUSINESS_EMAIL}</a>
                        </p>
                        <p style={{ margin: '0', fontSize: '13px', color: '#444', fontFamily: '"Montserrat", sans-serif', fontWeight: 500 }}>{BUSINESS_WEBSITE}</p>
                    </div>
                </div>

                {/* ➡️ ITEMS TABLE: S.No., Name, SKU (auto-generated), Price, Qty, Total */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px', fontFamily: '"Montserrat", sans-serif' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center', padding: '15px 10px', borderBottom: '2px solid #eee', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', fontWeight: 700, width: '50px' }}>S.No.</th>
                            <th style={{ textAlign: 'left', padding: '15px 10px', borderBottom: '2px solid #eee', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', fontWeight: 700 }}>Item</th>
                            <th style={{ textAlign: 'left', padding: '15px 10px', borderBottom: '2px solid #eee', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', fontWeight: 700, width: '130px' }}>SKU</th>
                            <th style={{ textAlign: 'center', padding: '15px 10px', borderBottom: '2px solid #eee', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', fontWeight: 700, width: '70px' }}>Price</th>
                            <th style={{ textAlign: 'center', padding: '15px 10px', borderBottom: '2px solid #eee', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', fontWeight: 700, width: '50px' }}>Qty</th>
                            <th style={{ textAlign: 'right', padding: '15px 10px', borderBottom: '2px solid #eee', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', fontWeight: 700, width: '80px' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.items.map((item, idx) => (
                            <tr key={idx}>
                                <td style={{ textAlign: 'center', padding: '18px 10px', borderBottom: '1px solid #f5f5f5', color: '#888', fontWeight: 600, fontSize: '13px' }}>{idx + 1}</td>
                                <td style={{ padding: '18px 10px', borderBottom: '1px solid #f5f5f5', fontWeight: 700, fontSize: '13px' }}>{item.name}</td>
                                <td style={{ padding: '18px 10px', borderBottom: '1px solid #f5f5f5', color: '#333', fontWeight: 700, fontSize: '12px', fontFamily: '"Montserrat", sans-serif' }}>{item.id.length > 10 ? item.id.substring(0, 8).toUpperCase() : item.id.toUpperCase()}</td>
                                <td style={{ textAlign: 'center', padding: '18px 10px', borderBottom: '1px solid #f5f5f5', color: '#555', fontWeight: 500, fontSize: '13px' }}>₹{item.sale_price}</td>
                                <td style={{ textAlign: 'center', padding: '18px 10px', borderBottom: '1px solid #f5f5f5', color: '#555', fontWeight: 500, fontSize: '13px' }}>{item.quantity}</td>
                                <td style={{ textAlign: 'right', padding: '18px 10px', borderBottom: '1px solid #f5f5f5', fontWeight: 700, fontSize: '13px' }}>₹{item.sale_price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* ➡️ TOTALS SECTION */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '350px', backgroundColor: '#fdf2f8', padding: '30px', borderRadius: '15px', fontFamily: '"Montserrat", sans-serif' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px', color: '#666', fontWeight: 500 }}>
                            <span>Subtotal</span>
                            <span>₹{orderData.total + (orderData.coupon ? Math.round(orderData.total / 0.9 * 0.1) : 0)}</span>
                        </div>

                        {orderData.savings > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px', color: '#16a34a', fontWeight: 700 }}>
                                <span>You Saved</span>
                                <span>- ₹{orderData.savings}</span>
                            </div>
                        )}

                        {orderData.coupon && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px', color: '#16a34a', fontWeight: 600 }}>
                                <span>Coupon ({orderData.coupon})</span>
                                <span>Applied ✓</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px', color: '#666', fontWeight: 500 }}>
                            <span>Shipping</span>
                            <span style={{ color: '#16a34a', fontWeight: 700 }}>FREE</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #fbcfe8', paddingTop: '20px', fontSize: '24px', fontWeight: '900', color: '#db2777' }}>
                            <span>Total</span>
                            <span>₹{orderData.total}</span>
                        </div>
                    </div>
                </div>

                {/* ➡️ FOOTER: Business contact info */}
                <div style={{ marginTop: '80px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '30px', color: '#888', fontSize: '12px', fontFamily: '"Montserrat", sans-serif', fontWeight: 500 }}>
                    <p style={{ margin: '0 0 5px 0' }}>Thank you for shopping with {BUSINESS_NAME}!</p>
                    <p style={{ margin: '0 0 5px 0' }}>If you have any questions about this invoice, please contact us on WhatsApp.</p>
                    <p style={{ margin: '0', fontSize: '11px', color: '#aaa', fontWeight: 400 }}>{BUSINESS_ADDRESS} | <a href={`callto:${BUSINESS_PHONE}`} style={{ color: '#aaa', textDecoration: 'none' }}>{BUSINESS_PHONE}</a> | <a href={`mailto:${BUSINESS_EMAIL}`} style={{ color: '#aaa', textDecoration: 'none' }}>{BUSINESS_EMAIL}</a></p>
                </div>
            </div>

        </Dialog>
    );
}
