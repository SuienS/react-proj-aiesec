(window["webpackJsonpreact-proj-aiesec"]=window["webpackJsonpreact-proj-aiesec"]||[]).push([[0],{33:function(e,t,a){e.exports=a(67)},39:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var i=a(1),n=a.n(i),l=a(9),r=a.n(l),o=(a(38),a(39),a(12)),c=a(26),s=a(27),d=a(31),p=a(28),u=a(32),m=a(11),h=a.n(m),g=a(69),E=a(70),f=a(79),O=a(71),v=a(72),y=a(73),b=a(74),w=a(75),M=a(76),k=a(77),D=a(78),S=function(e){function t(){var e,a;Object(c.a)(this,t);for(var i=arguments.length,n=new Array(i),l=0;l<i;l++)n[l]=arguments[l];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(n)))).curPage=1,a.state={isLoaded:!1,opportunities:[],page:1,totPages:null,scrolling:!1,editOpData:{id:"",title:"",description:""},editOpModal:!1},a.handleScroll=function(e){var t=a.state,i=t.scrolling,n=t.totPages,l=t.page;if(!i&&!(n<=l)){var r="innerHeight"in window?window.innerHeight:document.documentElement.offsetHeight,o=document.body,c=document.documentElement,s=Math.max(o.scrollHeight,o.offsetHeight,c.clientHeight,c.scrollHeight,c.offsetHeight);r+window.pageYOffset>=s&&a.loadMore()}},a.refreshOpList=function(){var e=a.state,t=e.opportunities,i=(e.perPage,e.page);console.log(i);var n="https://api-staging.aiesec.org/v2/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c&page="+i;h.a.get(n).then(function(e){a.setState({opportunities:[].concat(Object(o.a)(t),Object(o.a)(e.data.data)),scrolling:!1,totPages:e.data.paging.total_pages,isLoaded:!0})})},a.loadMore=function(){a.setState(function(e){return{page:e.page+1,scrolling:!0}},a.refreshOpList)},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.refreshOpList(),this.scrollListner=window.addEventListener("scroll",function(t){e.handleScroll(t)})}},{key:"toggleEditOpModal",value:function(){this.setState({editOpModal:!this.state.editOpModal})}},{key:"updateOpportunity",value:function(){this.setState({editOpModal:!1,editOpData:{id:"",title:"",description:""}})}},{key:"editOpportunity",value:function(e,t){var a=this;h.a.get("http://api-staging.aiesec.org/v2/opportunities/"+e+"?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c").then(function(i){var n=i.data.description;a.setState({editOpData:{id:e,title:t,description:n},editOpModal:!a.state.editOpModal})})}},{key:"render",value:function(){var e=this;if(!this.state.isLoaded){return n.a.createElement("div",{style:{position:"fixed",top:"50%",left:"50%"}},n.a.createElement(g.a,{style:{width:"5rem",height:"5rem"},type:"grow",color:"primary"}),"      ")}var t=this.state.opportunities.map(function(t){return n.a.createElement("tr",{key:t.id},n.a.createElement("td",null,n.a.createElement("img",{src:t.profile_photo_urls.thumb,alt:"Pic"})),n.a.createElement("td",null,t.id),n.a.createElement("td",null,t.title),n.a.createElement("td",null,t.location),n.a.createElement("td",null,n.a.createElement(E.a,{color:"primary",size:"sm",className:"mr-2",onClick:e.editOpportunity.bind(e,t.id,t.title)},"Edit")))});return n.a.createElement("div",{className:"App container"},n.a.createElement(f.a,{isOpen:this.state.editOpModal,toggle:this.toggleEditOpModal.bind(this)},n.a.createElement(O.a,{toggle:this.toggleEditOpModal.bind(this)},"Edit Opportunity"),n.a.createElement(v.a,null,n.a.createElement(y.a,null,n.a.createElement(b.a,{for:"title"},"Title"),n.a.createElement(w.a,{id:"title",value:this.state.editOpData.title,onChange:function(t){var a=e.state.editOpData;a.title=t.target.value,e.setState({editOpData:a})}})),n.a.createElement(y.a,null,n.a.createElement(b.a,{for:"description"},"Description"),n.a.createElement(w.a,{id:"description",value:this.state.editOpData.description,onChange:function(t){var a=e.state.editOpData;a.description=t.target.value,console.log(a.description),e.setState({editOpData:a})}}))),n.a.createElement(M.a,null,n.a.createElement(E.a,{color:"primary",onClick:this.updateOpportunity.bind(this)},"Update Opportunity")," ",n.a.createElement(E.a,{color:"secondary",onClick:this.toggleEditOpModal.bind(this)},"Cancel"))),n.a.createElement(k.a,null,n.a.createElement("h1",{className:"display-3"},"AIESEC Opportunities Portal"),n.a.createElement("p",{className:"lead"},"This is project created by Ravidu Silva"),n.a.createElement("p",{className:"lead"},"Email - ravidu.silva@aiesec.net"),n.a.createElement("hr",{className:"my-2"}),n.a.createElement("br",null),n.a.createElement(D.a,{dark:!0,className:"opportunities"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Pic"),n.a.createElement("th",null,"Number"),n.a.createElement("th",null,"Title"),n.a.createElement("th",null,"Location"),n.a.createElement("th",null,"Controls"))),n.a.createElement("tbody",null,t))),n.a.createElement(f.a,{isOpen:this.state.scrolling},n.a.createElement(O.a,null,"Loading Opportunities...")))}}]),t}(i.Component);r.a.render(n.a.createElement(S,null),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.06ea7263.chunk.js.map