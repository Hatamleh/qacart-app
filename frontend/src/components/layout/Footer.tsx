import { Heart, Shield, FileText, RefreshCw } from 'lucide-react'
import { GridBackground } from '../ui/GridBackground'
import { SocialLinks } from '../ui/SocialLinks'

export const Footer = () => {
    return (
        <GridBackground>
            <footer className="py-16">
                <div className="container mx-auto px-6">
                    {/* Logo & Description */}
                    <div className="text-center mb-8">
                        <div className="mb-6">
                            <img
                                src="/qacart-logo.svg"
                                alt="QACart logo"
                                className="h-32 w-auto mx-auto"
                            />
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-lg max-w-xl mx-auto">
                            منصة تعليمية رائدة في اختبار البرمجيات، تهدف إلى تطوير مهارات المتخصصين وإعداد جيل جديد من خبراء ضمان الجودة.
                        </p>
                    </div>

                    {/* Social Media Section */}
                    <div className="text-center mb-8">
                        <SocialLinks />
                    </div>

                    {/* Footer Bottom */}
                    <div>
                        <div className="flex flex-col items-center gap-6 text-center">

                            {/* Policy Links with Icons */}
                            <div className="flex flex-wrap justify-center gap-6 text-sm">
                                <a href="/privacy" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                    <Shield className="w-4 h-4" />
                                    سياسة الخصوصية
                                </a>
                                <a href="/terms" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                    <FileText className="w-4 h-4" />
                                    الشروط والأحكام
                                </a>
                                <a href="/refund" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                    <RefreshCw className="w-4 h-4" />
                                    سياسة الاسترداد
                                </a>
                            </div>

                            {/* Copyright */}
                            <div className="text-sm text-muted-foreground">
                                © 2026 QAcart. جميع الحقوق محفوظة
                            </div>
                            
                            {/* Made with Love */}
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <span>صُنع بحب من QAcart</span>
                                <Heart className="w-4 h-4 text-red-500 fill-current" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </GridBackground>
    )
}
