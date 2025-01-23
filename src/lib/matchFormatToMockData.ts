const matchFieldFormatToMockData = (format: string) => {
  switch (format) {
    case "raw":
      return "123";
    case "amount":
      return "0.19866144 ETH";
    case "tokenAmount":
      return "0.19866144 DAI";
    case "nftName":
      return "CryptoKitty";
    case "date":
      return "2024-02-29T08:27:12";
    case "duration":
      return "duration";
    default:
      return format;
  }
};

export default matchFieldFormatToMockData;
