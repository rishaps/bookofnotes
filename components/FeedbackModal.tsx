import React, { useState } from 'react';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    selection: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, selection }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setIsSent(true);
        setTimeout(() => {
            setIsSent(false);
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[var(--bg-body)] border border-black/10 dark:border-white/10 shadow-2xl w-full max-w-lg p-8 relative rounded-sm opacity-100">
                {/* Ensure opacity-100 and bg-[var(--bg-body)] handles visibility in both modes */}

                {/* Header */}
                <h2 className="font-serif text-2xl font-bold mb-4 text-content-primary">Feedback</h2>
                <p className="text-sm font-light text-content-secondary mb-6">
                    Qualcosa non funziona? C'è un errore negli appunti? Fammelo sapere qui sotto:
                </p>

                {/* Form */}
                {!isSent ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div>
                            <input
                                type="email"
                                placeholder="LA TUA EMAIL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border border-black/20 dark:border-white/20 p-3 font-mono text-sm focus:outline-none focus:border-premium-gold transition-colors text-content-primary"
                            />
                        </div>

                        {selection && (
                            <div className="relative">
                                <div className="absolute -top-3 left-3 bg-[var(--bg-body)] px-1 text-xs font-mono text-content-muted">
                                    Contesto Selezionato
                                </div>
                                <div className="w-full p-4 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-xs text-content-muted italic line-clamp-3">
                                    "{selection}"
                                </div>
                            </div>
                        )}

                        <div>
                            <textarea
                                placeholder="Scrivi qui il tuo feedback..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="w-full bg-transparent border border-black/20 dark:border-white/20 p-3 font-mono text-sm focus:outline-none focus:border-premium-gold transition-colors resize-none text-content-primary"
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
                            <p className="text-[10px] text-content-muted italic">
                                {/* Removed newsletter mention */}
                                Grazie per il contributo.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="font-mono text-xs uppercase hover:underline text-content-primary"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="font-mono text-xs uppercase border border-black/20 dark:border-white/20 px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-content-primary"
                                >
                                    {isSubmitting ? 'Invio...' : 'Invia Feedback'}
                                </button>
                            </div>
                        </div>

                    </form>
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-500 font-bold text-xl">✓</div>
                        <p className="font-serif text-xl text-content-primary">Feedback Inviato!</p>
                        <p className="text-sm text-content-muted mt-2">Grazie per aver aiutato a migliorare gli appunti.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackModal;
