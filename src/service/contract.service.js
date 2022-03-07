import { config, ownerAddress } from "../config/config";

export class ContractService {
    contractABi;
    contractAddress;

    constructor(_contractAbi, _contractAddress, ) {
        this.contractABi = _contractAbi;
        this.contractAddress = _contractAddress;
    }

    getAllPosts = async () => {
        try {     
            const { contractServerUrl } = config
            if (this.contractAddress && this.contractABi) {
                const allPost = new contractServerUrl.eth.Contract(this.contractABi, this.contractAddress);
                const response = await allPost.methods.fetchAllPosts().call();
                return response;
            } else {
                return {};
            }
        } catch (error) { 
            return error;
        }
    }

    createPost = async (title, hash) => {
        try {
            const { contractServerUrl } = config
            if (this.contractAddress && this.contractABi) {
                const createPost = new contractServerUrl.eth.Contract(this.contractABi, this.contractAddress);
                try {
                    const postValues = await createPost.methods.createPost(title, hash).send({
                        from: localStorage.getItem('public')
                    }).on((tx) => {
                        return tx;
                    });
                    return postValues;
                } catch (error) {
                    return error;
                }
            }
        } catch (error) {
            return error
        }
    }
}