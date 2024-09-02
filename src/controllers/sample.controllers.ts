import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const sample = asyncHandler(async (req, res) => {
  return res.json(new ApiResponse(200, "OK", "Sample Test Ok"));
});

export default sample;
