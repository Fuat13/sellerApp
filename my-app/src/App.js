import logo from './logo.svg';
import React from "react";
import './App.css';
import Header from './components/Header';
import Filtre from './components/Filtre';
import Catogories from './components/Catogories';
import Login from './components/Login';
import ProfileHeader from './components/ProfileHeader';
import AnaEkranPost from './components/AnaEkranPost';
import MessageBubble from './components/MessageBubble';
import Chat from './components/Chat';
import { getValue } from '@testing-library/user-event/dist/utils';

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.FilterSwitch = null;

    this.state = {
      currentUser:undefined,
      Users:[{
        userName:"asd",
        password:"dsa"
      },
      {
        userName:"dsa",
        password:"asd"
      }
      ],
      currentPost:undefined,
      whichScreen:0,
      currentCatogorie:undefined,
      currentMessages:undefined,
      catogories : [
        "Araba",
        "Ev",
        "Elektronik",
        "Spor",
        "Dekorasyon",
        "Diğer"
      ],
      currentChats:[],
      currentPhotos: [],
      header:"",
      description:"",
      fiyat:"",
      konum:"",
      Message:"",
      posts:
      [
/*        {
          images:[],
          header:"",
          description:"",
          price:"",
          location:"",
          category:"",
          user:"",
          chats:[{
            user:"username",
            messages:[
              {user:"",message:""}
            ]
          }]
        }*/
      ],
      filter:{
        header:"",
        description:"",
        priceMin: Number.MIN_VALUE,
        priceMax: Number.MAX_VALUE,
        category: "",
        user:""
      },
      defaultFilter:{
        header:"",
        description:"",
        priceMin: Number.MIN_VALUE,
        priceMax: Number.MAX_VALUE,
        category: "",
        user:""
      }
    }
    
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this)
    this.ChangeScreen = this.ChangeScreen.bind(this);
    this.setCurrentCatog = this.setCurrentCatog.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.showPostInfo = this.showPostInfo.bind(this);

    this.applyFilter = this.applyFilter.bind(this);
    this.applyCategory = this.applyCategory.bind(this);
    this.applyUser = this.applyUser.bind(this);

    this.addPost = this.addPost.bind(this);

    this.toMessageScreen = this.toMessageScreen.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getChats = this.getChats.bind(this);
    this.toMessageScreenWithChat = this.toMessageScreenWithChat.bind(this);

    window.ChangeScreen = this.ChangeScreen;
  }

  applyFilter(filter){
    let obj = {
      ...this.state.filter,
      ...filter
    };

    this.setState({filter:obj});
  }

  applyCategory(category){
    console.log(category)
    if(this.state.filter.category === category)
      category = "";
    let obj = {
      ...this.state.filter,
      category:category
    };

    this.setState({filter:obj});
  }

  applyUser(user){
    let obj = {
      ...this.state.defaultFilter,
      user:user
    }

    this.setState({filter:obj});
  }
  
  onFileChange(event){
    let arr = [];
    for(let i = 0; i < event.target.files.length; i++)
      arr.push(URL.createObjectURL(event.target.files[i]));
    this.setState({currentPhotos: [...this.state.currentPhotos ,...arr]})
  }
  
  componentDidMount(){
    let catog = {};
    Object.keys(this.state.catogories).forEach(element => {
      catog[element] = "#79ff5e";
    }); 
    this.setState({
      catogoriesColor: catog
    })
  }
  
  ChangeScreen(screenID){
    this.setState({whichScreen:screenID});
  }
  
  login(userName, password){
    let user =this.state.Users.find((e)=>e.userName === userName && e.password === password)
    if(user !== undefined){
      this.setState({currentUser: user});
      window.LoginSwitch();
    }
  }
  
  logout(){
    this.setState({currentUser: undefined, whichScreen:0})
  }

  setCurrentCatog(e){
    let catog = {};
    Object.keys(this.state.catogories).forEach(element => {
      catog[element] = "#79ff5e";
    }); 
    catog[e] = "#2bff00"; 
    this.setState({
      currentCatogorie: e,
      catogoriesColor: catog
    })
  }

  onInputChange(item, value){
    let val = {}
    val[item] = value.target.value
    this.setState(val);
  }

  addPost(){
    let post = {
      images:this.state.currentPhotos,
      header:this.state.header,
      description:this.state.description,
      price: parseFloat(this.state.fiyat),
      location:this.state.konum,
      category:this.state.currentCatogorie,
      user:this.state.currentUser.userName,
      chats:[]
    }

    this.setState(
      {
        posts:[...this.state.posts, post], 
        currentPhotos:[],
        currentCatogorie:undefined
      });

    this.ChangeScreen(0);
  }

  showPostInfo(el){
    this.setState({
      currentPost:el,
    })
    this.ChangeScreen(5);
  }

  toMessageScreen(){
    let message = this.state.currentPost.chats.find((elem)=>elem.user === this.state.currentUser.userName);
    if(message === undefined){
      this.state.currentPost.chats.push({
       user:this.state.currentUser.userName,
       messages:[] 
      })
      message = this.state.currentPost.chats.find((elem)=>elem.user === this.state.currentUser.userName);
    }
    
    this.setState({currentMessages: message, whichScreen:6});
  }

  toMessageScreenWithChat(va){
    this.setState({currentMessages: va, whichScreen:6});

  }

  sendMessage(){
    this.state.currentMessages.messages.push({
      user:this.state.currentUser.userName,
      message:this.state.Message
    })

    this.setState({currentMessages:this.state.currentMessages});
  }

  getChats(){
    let arr = []
    this.state.posts.filter((elem)=>elem.user === this.state.currentUser.userName).forEach((elem)=>elem.chats.forEach((el)=>arr.push(el)))
    console.log(arr);
    this.setState({currentChats:arr})
  }
  
  render(){
    switch(this.state.whichScreen){
      case 7: //User Messages
      return(
        <div className='App'>
            <div className='floatButton floatButtonBack' onClick={()=>this.ChangeScreen(0)}>
              <p>&lArr;</p>
            </div>
            <div className='postsAddDiv'>
              <div className='postsAddCatogories' style={{flexWrap:"nowrap",flexDirection:"column"}}>
                <div style={{height:"90%", width:"100%"}}>
                  {
                    this.state.currentChats !== undefined && this.state.currentChats.map(elem=>
                      <Chat chat={elem} onClick={()=>this.toMessageScreenWithChat(elem)}/>
                      )
                  }
                </div>
              </div>
            </div>
        </div>
      )
      case 6: //Post Messages
      return(
        <div className='App'>
            <div className='floatButton floatButtonBack' onClick={()=>this.ChangeScreen(0)}>
              <p>&lArr;</p>
            </div>
            <div className='postsAddDiv'>
              <div className='postsAddCatogories' style={{flexWrap:"nowrap",flexDirection:"column"}}>
                <div style={{height:"90%", width:"100%"}}>
                  {
                    this.state.currentMessages.messages.map(elem=>
                      <MessageBubble messages={elem.message} isLeft={this.state.currentUser.userName !== elem.user}></MessageBubble>
                      )
                  }
                </div>
                <input type="text" placeholder='Messages' onChange={elem=>this.onInputChange("Message", elem)}></input>
                <div onClick={()=>this.sendMessage()}><p>Message</p></div>
              </div>
            </div>
        </div>
      )
      case 5: //Post Info
      return(
        <div className='App'>
            <div className='floatButton floatButtonBack' onClick={()=>this.ChangeScreen(0)}>
              <p>&lArr;</p>
            </div>
            <div className='postsAddDiv'>
              <div className='postsAddCatogories' style={{flexWrap:"nowrap",flexDirection:"column"}}>
                <div className='postsAddImagesDiv' style={{display:"inline-block",flexDirection:"row",overflowX:"auto",flexWrap:"nowrap",height:"40%", width:"100%"}}>
                  { this.state.currentPost.images.map((elem)=>
                    <div style={{backgroundImage:"url("+elem+")",width:"100%", height:"100%", backgroundSize:"cover"}}></div>) 
                  }
                </div>
                <h1>{this.state.currentPost.header}</h1>
                <p>{this.state.currentPost.description}</p>
                <h2>{this.state.currentPost.price}</h2>
                <p>{this.state.currentPost.location}</p>
                <p>{this.state.currentPost.category}</p>
                <p>{this.state.currentPost.user}</p>
                <div onClick={()=>this.toMessageScreen()}><p>Message</p></div>
              </div>
            </div>
        </div>
      )
      case 4: //Post Add
      return(
        <div className='App'>
            <div className='floatButton floatButtonBack' onClick={()=>this.ChangeScreen(2)}>
              <p>&lArr;</p>
            </div>
            <div className='floatButton floatButtonNext' onClick={this.addPost}>
              <p>&rArr;</p>
            </div>

            <div className='postsAddDiv'>
              <div className='postsAddCatogories' style={{flexDirection:"column"}}>
                <input type="text" placeholder='Header' onChange={elem=>this.onInputChange("header", elem)}></input>
                <textarea type="text" placeholder='Description' onChange={elem=>this.onInputChange("description", elem)}></textarea>
                <input type="text" placeholder='Price' onChange={elem=>this.onInputChange("fiyat", elem)}></input>
                <input type="text" placeholder='Location'onChange={elem=>this.onInputChange("konum", elem)}></input>
                </div>
            </div>
        </div>
      )
      case 3: //Post Add
      return(
        <div className='App'>
            <div className='floatButton floatButtonBack' onClick={()=>this.ChangeScreen(2)}>
              <p>&lArr;</p>
            </div>
            <div className='floatButton floatButtonNext' onClick={()=>this.ChangeScreen(4)}>
              <p>&rArr;</p>
            </div>

            <div className='postsAddDiv'>
              <div className='postsAddCatogories'>
                <input type="file" multiple accept="image/*" onChange={this.onFileChange} />
                <div className='postsAddImagesDiv'>
                {
                  this.state.currentPhotos.map((elem)=>
                    <div style={{backgroundImage:"url("+elem+")",width:"100%", height:"100%", backgroundSize:"cover"}}></div>)   
                }
                </div>
              </div>
            </div>
        </div>
      )
      case 2: //Post Add
        return(
          <div className='App'>
              <div className='floatButton floatButtonBack' onClick={()=>this.ChangeScreen(0)}>
                <p>&lArr;</p>
              </div>
              <div className='floatButton floatButtonNext' onClick={()=>this.ChangeScreen(3)}>
                <p>&rArr;</p>
              </div>

              <div className='postsAddDiv'>
                <div className='postsAddCatogories'>
                  {this.state.catogories.map((elem)=>(
                    <div key={elem} style={{backgroundColor:this.state.catogoriesColor[elem]}} className='postsAddCatogorie' onClick={()=>this.setCurrentCatog(elem)}>
                      <p>{elem}</p>
                    </div>

                  ))}
                </div>
              </div>
          </div>
        )
      case 1: //Profil
        return(
        <div className='App'>
            <div className='Ilanlar'>
              { this.state.posts.filter(
                (el)=>
                  el.header.includes(this.state.filter.header) && el.description.includes(this.state.filter.description) && 
                  el.price >= this.state.filter.priceMin && el.price <= this.state.filter.priceMax && el.category.includes(this.state.filter.category) &&
                  (this.state.filter.user !== ""? el.user === this.state.currentUser.userName: true )
                ).map(el=><AnaEkranPost onClick={this.showPostInfo} post={el}/>)
              }
            </div>
          <ProfileHeader logout={this.logout}/>
        </div>
        )
      case 0: //Ana Ekran
      default: //Genel
        return(
          <div className='App'>
            {
              (this.state.currentUser !== undefined) &&(
              <div className='floatButton floatButtonAdd' onClick={()=>this.ChangeScreen(2)}>
                <p>&#x2795;</p>
              </div>
              )
            }
            <div className='Ilanlar'>
              { this.state.posts.filter(
                (el)=>
                  el.header.includes(this.state.filter.header) && el.description.includes(this.state.filter.description) && 
                  el.price >= this.state.filter.priceMin && el.price <= this.state.filter.priceMax && el.category.includes(this.state.filter.category) &&
                  (this.state.filter.user !== ""? el.user === this.state.filter.user: true )
                ).map(el=><AnaEkranPost onClick={this.showPostInfo} post={el}/>)
              }
            </div>
            <Catogories Catogories={this.state.catogories} applyCategory={this.applyCategory}></Catogories>
            <Filtre applyFilter={this.applyFilter}></Filtre>
            <Login loginEvent={this.login}></Login>
            <Header getChats={this.getChats} currentUser={this.state.currentUser} applyUser={this.applyUser}></Header>
          </div>
        )
    }
  }
}