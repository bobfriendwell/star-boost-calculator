import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LoginDialog from "@/components/LoginDialog";
import RatingCalculator from "@/components/RatingCalculator";
import { Star, Coffee } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2 bg-brand/10 rounded-full mb-4">
            <Star className="h-6 w-6 text-brand fill-brand" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">五星達標試算器</h1>
          
          <p className="text-xl text-muted-foreground mb-4">
            快速試算你還差幾則五星評論，就能突破理想評分門檻！
          </p>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-6">
              「你知道嗎？平均評分從 4.2 提升到 4.5，其實只差幾則五星好評！」<br />
              用我們的「五星達標試算器」，立即找出需要幾則評論、精準布局顧客關係經營。
            </p>
          </div>
          
          {!isLoggedIn && (
            <div className="inline-block bg-brand/5 rounded-lg p-3 mb-8">
              <Button 
                variant="outline" 
                onClick={() => setIsLoginDialogOpen(true)}
                className="border-brand/20 text-brand hover:bg-brand/10 hover:text-brand-dark"
              >
                登入專業版
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                解鎖更多功能與詳細分析
              </p>
            </div>
          )}
        </header>

        <main className="max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8">
          <RatingCalculator isLoggedIn={isLoggedIn} />
        </main>

        <div className="text-center mt-8">
          <Button 
            className="bg-[#F97316] text-white hover:bg-[#F97316]/90 transition-colors"
            onClick={() => window.open('https://api.payuni.com.tw/api/uop/receive_info/2/2/NPPA42639797/HvfduJv37P3n32poZPRb', '_blank')}
          >
            <Coffee className="h-4 w-4 mr-2" /> Buy me a coffee
          </Button>
        </div>

        <footer className="text-center text-sm text-muted-foreground mt-12">
          <p>© 2025 White Rock Hospitality Consulting. All rights reserved.</p>
        </footer>
      </div>

      <LoginDialog 
        isOpen={isLoginDialogOpen} 
        onOpenChange={setIsLoginDialogOpen} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Index;
