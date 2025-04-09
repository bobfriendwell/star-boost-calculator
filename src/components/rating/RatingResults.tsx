
import { Button } from "@/components/ui/button";
import { RefreshCw, Share2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingResultsProps {
  showResult: boolean;
  reviewCount: number | undefined;
  currentRating: number | undefined;
  targetRating: number | undefined;
  requiredReviews: number | null;
  onReset: () => void;
  onShare: () => void;
}

export function RatingResults({
  showResult,
  reviewCount,
  currentRating,
  targetRating,
  requiredReviews,
  onReset,
  onShare
}: RatingResultsProps) {
  return (
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
          onClick={onReset}
        >
          <RefreshCw className="h-4 w-4 mr-2" /> 再試一次
        </Button>
        
        <Button 
          className="flex-1" 
          onClick={onShare}
        >
          <Share2 className="h-4 w-4 mr-2" /> 分享結果
        </Button>
      </div>
    </div>
  );
}

export default RatingResults;
