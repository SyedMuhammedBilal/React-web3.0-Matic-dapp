import React, { useMemo, useEffect, useState } from 'react'
import { Contract_ABi } from '../abi/smart.contract.config'
import { contractAddress } from '../config/config'
import { ContractService } from '../service/contract.service'

const AllPost = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState();
    const contractService = useMemo(() => new ContractService(Contract_ABi, contractAddress) , [contractAddress, Contract_ABi]);

    useEffect(() => {
        const getUsersPosts = async () => {
            try {
                setLoading(true);
                const data = await contractService.getAllPosts();
                if (data) {
                    setLoading(false);
                    console.log("response: ", data);
                    setPosts(data);
                }
            } catch (error) {
                return error
            }
        }
        getUsersPosts();
    }, [contractService])

  return (
    <div>
        <div>

        </div>
    </div>
  )
};

export default AllPost

