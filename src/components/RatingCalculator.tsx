import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw, Share2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface RatingCalculatorProps {
  isLoggedIn: boolean;
}

export function RatingCalculator({ isLoggedIn }: RatingCalculatorProps) {
  const [reviewCount, setReviewCount] = useState<number | undefined>(undefined);
  const [currentRating, setCurrentRating] = useState<number | undefined>(undefined);
  const [targetRating, setTargetRating] = useState<number | undefined>(undefined);
  const [requiredReviews, setRequiredReviews] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  // Calculate required 5-star reviews to reach target rating
  const calculateRequiredReviews = () => {
    if (!reviewCount || !currentRating || !targetRating) {
      return null;
    }

    if (targetRating <= currentRating) {
      return 0;
    }

    if (targetRating > 5) {
      return null;
    }

    const required = Math.ceil(reviewCount * (targetRating - currentRating) / (5 - targetRating));
    return required > 0 ? required : 0;
  };

  const handleCalculate = () => {
    if (!reviewCount || !currentRating || !targetRating) {
      toast({
        variant: "destructive",
        title: "資料不完整",
        description: "請填寫所有必填欄位",
      });
      return;
    }

    if (reviewCount <= 0) {
      toast({
        variant: "destructive",
        title: "評論數量無效",
        description: "評論數量必須大於 0",
      });
      return;
    }

    if (currentRating < 1 || currentRating > 5) {
      toast({
        variant: "destructive",
        title: "目前評分無效",
        description: "評分必須在 1 到 5 之間",
      });
      return;
    }

    if (targetRating < 1 || targetRating > 5) {
      toast({
        variant: "destructive",
        title: "目標評分無效",
        description: "評分必須在 1 到 5 之間",
      });
      return;
    }

    if (targetRating < currentRating) {
      toast({
        variant: "destructive",
        title: "目標評分無效",
        description: "目標評分必須大於或等於目前評分",
      });
      return;
    }

    setIsCalculating(true);

    // Simulate calculation time with a small delay for better UX
    setTimeout(() => {
      const result = calculateRequiredReviews();
      setRequiredReviews(result);
      setShowResult(true);
      setIsCalculating(false);
    }, 800);
  };

  const handleReset = () => {
    setReviewCount(undefined);
    setCurrentRating(undefined);
    setTargetRating(undefined);
    setRequiredReviews(null);
    setShowResult(false);
  };

  const handleShare = () => {
    if (!reviewCount || !currentRating || !targetRating || requiredReviews === null) {
      return;
    }

    const shareText = `現有${reviewCount}則評論，平均${currentRating}顆星，要提升至${targetRating}顆星，還需要${requiredReviews}則五星評論！`;
    
    if (navigator.share) {
      navigator.share({
        title: '五星達標試算結果',
        text: shareText,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: "已複製到剪貼簿",
          description: "分享內容已複製到剪貼簿",
        });
      }).catch(console.error);
    }
  };

  useEffect(() => {
    // Auto-calculate when all fields are filled and user is logged in
    if (reviewCount && currentRating && targetRating && isLoggedIn) {
      handleCalculate();
    }
  }, [reviewCount, currentRating, targetRating, isLoggedIn]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="form-group">
            <Label htmlFor="reviewCount">現有評論數量</Label>
            <div className="number-input-wrapper">
              <Input
                id="reviewCount"
                type="number"
                min="1"
                step="1"
                placeholder="例：42"
                value={reviewCount || ""}
                onChange={(e) => setReviewCount(e.target.value ? Number(e.target.value) : undefined)}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="currentRating">現在平均評分</Label>
            <div className="number-input-wrapper">
              <Input
                id="currentRating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="例：4.2"
                value={currentRating || ""}
                onChange={(e) => setCurrentRating(e.target.value ? Number(e.target.value) : undefined)}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="targetRating">目標平均評分</Label>
            <div className="number-input-wrapper">
              <Input
                id="targetRating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="例：4.5"
                value={targetRating || ""}
                onChange={(e) => setTargetRating(e.target.value ? Number(e.target.value) : undefined)}
                className="form-control"
              />
            </div>
          </div>

          {!isLoggedIn && (
            <Button 
              onClick={handleCalculate} 
              className="w-full" 
              disabled={isCalculating}
            >
              {isCalculating ? "計算中..." : "計算需要的五星評論"}
            </Button>
          )}
        </div>

        {/* Results Section */}
        <div 
          className={cn(
            "result-card", 
            showResult && requiredReviews !== null ? "active animate-fade-in" : "hidden"
          )}
        >
          <div className="text-center">
            <h3 className="text-lg font-medium mb-3">✅ 根據你的輸入：</h3>
            
            <p className="text-muted-foreground mb-4">
              目前有 <span className="font-semibold text-foreground">{reviewCount}</span> 則評論，
              平均評分 <span className="font-semibold text-foreground">{currentRating}</span> 顆星<br />
              想提升到 <span className="font-semibold text-foreground">{targetRating}</span> 顆星
            </p>
            
            <div className="bg-brand/10 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center text-brand">
                <Star className="h-6 w-6 fill-brand text-brand mr-2" />
                <span className="text-xl font-bold">
                  {requiredReviews === 0 
                    ? "你已經達到目標了！" 
                    : `你需要再獲得 ${requiredReviews} 則 5 星評論`}
                </span>
              </div>
              {requiredReviews !== 0 && (
                <div className="text-sm text-brand-dark mt-1">就能達成目標！</div>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground mt-3">
              試算值為理論推估，實際結果可能依 Google 顯示機制略有差異
            </p>
          </div>

          <div className="flex space-x-3 mt-4">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleReset}
            >
              <RefreshCw className="h-4 w-4 mr-2" /> 再試一次
            </Button>
            
            <Button 
              className="flex-1" 
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" /> 分享結果
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingCalculator;
