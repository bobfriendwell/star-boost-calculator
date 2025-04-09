
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface RatingInputFormProps {
  reviewCount: number | undefined;
  setReviewCount: (value: number | undefined) => void;
  currentRating: number | undefined;
  setCurrentRating: (value: number | undefined) => void;
  targetRating: number | undefined;
  setTargetRating: (value: number | undefined) => void;
  onCalculate: () => void;
  isCalculating: boolean;
  isLoggedIn: boolean;
}

export function RatingInputForm({
  reviewCount,
  setReviewCount,
  currentRating,
  setCurrentRating,
  targetRating,
  setTargetRating,
  onCalculate,
  isCalculating,
  isLoggedIn
}: RatingInputFormProps) {
  return (
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
          onClick={onCalculate} 
          className="w-full" 
          disabled={isCalculating}
        >
          {isCalculating ? "計算中..." : "計算需要的五星評論"}
        </Button>
      )}
    </div>
  );
}

export default RatingInputForm;
