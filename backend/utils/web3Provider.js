const { ethers } = require("ethers");
const gradingABI = require("../abi/SaveGrading.json");

// Tạo signer từ ví backend (private key)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Kết nối contract đã deploy với ABI và địa chỉ
const gradingContract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  gradingABI,
  signer
);
// cần có file ABI chuẩn abi/SaveGrading.json tương ứng.
module.exports = gradingContract;
