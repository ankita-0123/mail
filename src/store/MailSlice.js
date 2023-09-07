import { createSlice } from "@reduxjs/toolkit";

const mailSlice=createSlice({
    name:'mail',
    initialState:{mail:{}, node:'',mailData:[]},
    reducers:{
        MailArr(state, action){
state.mailData=[...action.payload]

        },
        AddMail(state,action){
            state.mail=action.payload
        },
        AddNode(state, action){
            state.node=action.payload;
        }
    }
})
export const MailAction=mailSlice.actions;
export default mailSlice.reducer;