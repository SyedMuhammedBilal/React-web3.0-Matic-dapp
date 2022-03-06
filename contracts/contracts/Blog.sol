//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Blog {
    string public name;
    address public owner;

    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
        uint id;
        string title;
        string content;
        bool published;
    }
    
    mapping (uint => Post) private idToPost;
    mapping (string => Post) private hashToPost;

    event PostCreated(uint id, string title, string hash);
    event PostUpdated(uint id, string title, string hash, bool published);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call this funcion");
        _;
    }

    constructor(string memory _name) {
        name = _name;
        owner = msg.sender;
    }

    function updateName(string memory _name) public {
        name = _name;
    } 

    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function fetchPost(string memory _hash) public view returns (Post memory) {
        return hashToPost[_hash];
    }

    function createPost(string memory _title, string memory _hash) public {
        // increment the counter value for postId.
        _postIds.increment();
        // get the current value of counter
        uint postId = _postIds.current();
        // add id to the new post
        Post storage post = idToPost[postId];
        post.id = postId;
        post.title = _title;
        post.content = _hash;
        post.published = true;
        // adding the hash for the post
        hashToPost[_hash] = post;
        emit PostCreated(postId, _title, _hash);
    }

    function updatePost(uint _postId, string memory _title, string memory _hash, bool _published) public {
        // get the post to be updated
        Post storage post = idToPost[_postId];
        post.title = _title;
        post.content = _hash;
        post.published = _published;
        // adding the post to the post id
        idToPost[_postId] = post;
        // adding the post to the hash mapping
        hashToPost[_hash] = post;
        emit PostUpdated(_postId, _title, _hash, _published);
    }

    /**  
        @dev return all post 
    */ 
    function fetchAllPosts() public view returns (Post[] memory) {
        /// @dev fetching current counter index
        uint itemCount = _postIds.current();
        /// @dev setting new variable to (0) to add post on new array with new index
        uint currentIndex = 0;

        /// @dev empty array with Post interface
        Post[] memory posts = new Post[](itemCount);
        
        /// @dev loop with the length of all post
        for(uint i = 0; i < itemCount; i++) {
            /// @dev increment iD by one (0 + 1 = 1)
            uint currentID = i + 1;
            /// @dev fetching post from blockchain with for loop index and saving it on variable
            Post storage currentItem = idToPost[currentID];
            /// @dev passing the fetched post to the newly created array
            posts[currentIndex] = currentItem;
            /// @dev incrementing the variable by one
            currentIndex += 1; 
        }
        return posts;
    }
}