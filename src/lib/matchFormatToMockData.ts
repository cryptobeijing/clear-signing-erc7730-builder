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
      return "date";
    case "duration":
      return "duration";
    default:
      return format;
  }
};

export default matchFieldFormatToMockData;
