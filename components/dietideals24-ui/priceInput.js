"use client";

import { Input } from "../shadcn-ui/input";

export default function PriceInput({ placeholderTxt, onFunctionChange }) {
  return (
    <Input
      type="number"
      step="0.01"
      placeholder={placeholderTxt}
      className="bg-white"
      min="1"
      max="9999"
      onChange={(e) => {
        onFunctionChange(e.target.value);
      }}
    ></Input>
  );
}
