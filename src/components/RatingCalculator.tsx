
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { calculateRequiredReviews } from "./rating/utils/calculationUtils";
import RatingInputForm from "./rating/RatingInputForm";
import RatingResults from "./rating/RatingResults";

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
      const result = calculateRequiredReviews(reviewCount, currentRating, targetRating);
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
        <RatingInputForm
          reviewCount={reviewCount}
          setReviewCount={setReviewCount}
          currentRating={currentRating}
          setCurrentRating={setCurrentRating}
          targetRating={targetRating}
          setTargetRating={setTargetRating}
          onCalculate={handleCalculate}
          isCalculating={isCalculating}
          isLoggedIn={isLoggedIn}
        />

        {/* Results Section */}
        <RatingResults
          showResult={showResult}
          reviewCount={reviewCount}
          currentRating={currentRating}
          targetRating={targetRating}
          requiredReviews={requiredReviews}
          onReset={handleReset}
          onShare={handleShare}
        />
      </div>
    </div>
  );
}

export default RatingCalculator;
