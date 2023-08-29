import React, { useState } from 'react';
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';


function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiSelect = ( emojiObject ) => {
      const messageWithEmoji = msg + emojiObject.emoji;
      setMsg(messageWithEmoji);
      setShowEmojiPicker(!showEmojiPicker);
  }
  
  const sendChat = (event) => {
    event.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg);
      setMsg('');
    }
  }
  

    const handleInputChange = (event) => {
        setMsg(event.target.value);
    }

    return (
        <Container>
        <div className='button-container'>
          <div className='emoji'>
              <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
              <div className="emoji-picker-container">
                  {showEmojiPicker && <Picker onEmojiClick={handleEmojiSelect} />}
              </div>
          </div>
        </div>
    
            <form className='input-container' onSubmit={(e) => sendChat(e) }>
                <input type='text' placeholder='Type your message here' value={msg} onChange={handleInputChange} />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}


const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #5727A3;
    padding: 0.2rem;
    padding-bottom: 0.2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.1rem;
      gap: 1rem;
    }
    .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: fixed;
            padding: 0.1rem;
            svg{
                font-size: 2rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -350px;
                background-color: #5727A3;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;
                .emoji-scroll-wrapper::-webkit-scrollbar {
                  background-color: #5727A3;
                  width: 5px;
                  &-thumb {
                    background-color: #9a86f3;
                  }
                }
                .emoji-categories {
                  button {
                    filter: contrast(0);
                  }
                }
                .emoji-search {
                  background-color: transparent;
                  border-color: #9a86f3;
                }
                .emoji-group:before {
                  background-color: #5727A3;
                }
            }
        }
    }
    .input-container {
        width: 95%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        input {
          width: 90%;
          height: 60%;
          background-color: transparent;
          color: white;
          border: none;
          padding-left: 1rem;
          font-size: 1.2rem;
    
          &::selection {
            background-color: #9a86f3;
          }
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.4rem 2rem ;
          border-radius: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #9a86f3;
          border: none;
          @media screen and (min-width: 720px) and (max-width: 1080px) {
            padding: 0.3rem 1rem;
            svg {
              font-size: 1rem;
            }
          }
          svg {
            font-size: 2rem;
            color: white;
          }
        }
      }
`;

export default ChatInput