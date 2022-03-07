import React, { useState, useEffect, useMemo } from 'react'
import { create } from 'ipfs-http-client'
import { Contract_ABi } from '../abi/smart.contract.config'
import { contractAddress } from '../config/config'
import { ContractService } from '../service/contract.service'


const client = create('https://ipfs.infura.io:5001/api/v0')

const initialState = {
    title: '',
    content: ''
}

const CreatePost = () => {
    const [post, setPost] = useState(initialState);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false)
    const fileRef = React.useRef(null)

    const contractService = useMemo(() => new ContractService(Contract_ABi, contractAddress) , [contractAddress, Contract_ABi]);

    const { title, content } = post;

    useEffect(() => {
        setTimeout(() => {
          /* delay rendering buttons until dynamic import is complete */
          setLoaded(true)
        }, 500)
      }, [])

    function onChange(e) {
        setPost(() => ({ ...post, [e.target.name]: e.target.value }))
    }


    async function createNewPost() {   
        /* saves post to ipfs then anchors to smart contract */
        if (!title || !content) return
        const hash = await savePostToIpfs()
        await savePost(post.title, hash)
      }

    async function savePostToIpfs() {
        /* save post metadata to ipfs */
        try {
          const added = await client.add(JSON.stringify(post))
          return added.path
        } catch (err) {
          console.log('error: ', err)
        }
    }

    const savePost = async (title ,hash) => {
        try {
            await contractService.createPost(title, hash);
           
        } catch (error) {
            return error
        }
    }

    function triggerOnChange() {
        /* trigger handleFileChange handler of hidden file input */
        fileRef.current.click()
      }

      async function handleFileChange (e) {
        /* upload cover image to ipfs and save hash to state */
        const uploadedFile = e.target.files[0]
        if (!uploadedFile) return
        const added = await client.add(uploadedFile)
        setPost(state => ({ ...state, coverImage: added.path }))
        setImage(uploadedFile)
      }

  return (
    <div>
        <div>
        {
        image && (
          <img style={{ maxWidth: "800px" }} src={URL.createObjectURL(image)} alt="pic" />
        )
      }
        </div>
        <div>
          <input
          onChange={onChange}
          name='title'
          placeholder='Give it a title ...'
          value={post.title}
        />
        </div>
        <div>
            <input name="content" placeholder="What's on your mind?"
        value={post.content}
        onChange={onChange} />
        </div>
        {
        loaded && (
          <>
            <button
              type='button'
              onClick={createNewPost}
            >Publish</button>
            <button
              onClick={triggerOnChange}
            >Add cover image</button>
          </>
        )
      }
      <div>
      <input
        id='selectImage'
        type='file'
        onChange={handleFileChange}
        ref={fileRef}
      />
      </div>
    </div>
  )
}

export default CreatePost