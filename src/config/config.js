import Web3 from "web3";

export const contractAddress = "0x18cCAb787A4921dcbBD73CA0FCAA6692E2Fc275B";
export const ownerAddress = "0xCf56303cA51E6b556d797f5C24EBe9Fb9Eae3e4a";

export const config = {
    contractServerUrl: new Web3(Web3.givenProvider || "http://localhost:7545")
}