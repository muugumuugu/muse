let cnvs,qtree,pts,neighbours,temppl=[],mode=!1,pl=[],pljson={data:[]};function preload(){csv=loadTable("../dat/agg-features-norm.csv","csv","header")}function setup(){btn=createButton("get a forest"),btn.mousePressed(movemouse),song=createSelect(""),song.id("main"),cnvs=createCanvas(windowWidth,windowHeight-150),background(255);let e=width/2,t=height/2,o=new Rectangle(e,t,e,t);qtree=new QuadTree(o,4);for(let o=0;o<csv.getRowCount();o++){let s=log(100-parseFloat(100*csv.getString(o,1)))*e*2/log(200),l=log(1+parseFloat(csv.getString(o,2)))*t*2/log(2),n=csv.getString(o,0),r=new Point(s,l,n,o);artist=r.data.replace(/.*\/(.*) _.*/,"$1").replace(/\(.*/,"").replace(/,.*/,""),song.option(o+" - "+r.data.replace(/.*_ /,"").replace(".mp3"," - "+artist),o),qtree.insert(r)}new TomSelect("#main",{create:!1,sortField:{field:"text",direction:"asc"}}),background(0),qtree.show()}function draw(){if(mode)return;background(0),qtree.show(),stroke(0,255,0),rectMode(CENTER);let e=new Rectangle(mouseX,mouseY,36,36);if(mouseX<width&&mouseY<height){if(e.show(!0),pts=qtree.query(e),!pts)return;for(let e of pts)if(e.show(!0),mouseIsPressed){pl.push(e),neighbors=qtree.closest(new Point(e.x,e.y),5),stroke(0,255,0,100),strokeWeight(1);for(let t of neighbors)pl.push(t),line(e.x,e.y,t.x,t.y)}let t=qtree.closest(new Point(mouseX,mouseY),1)[0];t&&(cnvs.elt.title=t.data)}}function mouseMoved(){mode||(pl=[])}function mouseReleased(){mouseX<width&&mouseY<height&&(pl.length>0&&(temppl=[...new Set(pl)]),temppl.length>0&&makensavepl(temppl),mode&&(mode=!1))}function makensavepl(e){let t=[];pljson.data=[];for(let o=0;o<e.length;o++){let s=e[o];t.push("#EXTINF: "+s.data.replace(/.*_ /,"").replace(".mp3","")),t.push("music/"+s.data),o<15&&pljson.data.push('"'+encodeURI("music/"+s.data)+'"')}const o=prompt("File Name");o&&saveStrings(t,o,"m3u");prompt("play?")&&(window.location.href=encodeURI(window.location.href.replace(/html\/.*/,'html/playlist_simple.html?playlist={"dat":['+pljson.data+"]}")))}function movemouse(){mode=!0;let e=song.value();const t=width/2,o=height/2;let s=log(100-parseFloat(100*csv.getString(e,1)))*t*2/log(200),l=log(1+parseFloat(csv.getString(e,2)))*o*2/log(2),n=new Rectangle(s,l,36,36);if(n.show(!0),pts=qtree.query(n),!pts)return;for(let e of pts){e.show(!0),pl.push(e),neighbors=qtree.closest(new Point(e.x,e.y),5),stroke(0,255,0,100),strokeWeight(1);for(let t of neighbors)pl.push(t),line(e.x,e.y,t.x,t.y)}let r=csv.getString(song.value(),0);r&&(cnvs.elt.title=r)}