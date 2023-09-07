import { createSlice } from "@reduxjs/toolkit";

let item=localStorage.getItem('token');
let initialData=JSON.parse(item);
const now = new Date();
if(initialData!==null&&now.getTime()>initialData.expiry){
    localStorage.removeItem('token')
    initialData.idToken = null;
    initialData.emailId = null
}

const AuthSlice=createSlice({
    name:'auth',
    initialState:{token:item!==null?initialData.token:'', email:item!==null?initialData.emailId:'', isLoggedIn:item!==null?true:false},
    reducers:{
        login(state,action){
            item = {
                emailId:action.payload.emailid,
                idToken:action.payload.token,
                expiry: new Date().getTime() + 10 * 60000
            }
            state.token=action.payload.token;
            state.email=action.payload.emailid
            localStorage.setItem('token', JSON.stringify(item))
            state.isLoggedIn=item!==null?true:false
        },
        logout(state)  { 
            state.token=null;
            localStorage.removeItem('token');
            item=null;
            state.isLoggedIn=item!==null?true:false
        },
        }
    
})
export const AuthActions=AuthSlice.actions;
export default AuthSlice.reducer;