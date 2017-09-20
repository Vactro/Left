function Navi()
{
  this.el = document.createElement('navi');
  this.markers = [];

  this.update = function()
  {
    this.update_markers();
    this.update_scrollbar();

    this.el.innerHTML = "";
    var active_line_id = left.active_line_id();
    var i = 0;
    for(marker_id in this.markers){
      var marker = this.markers[marker_id];
      var next_marker = this.markers[i+1];
      var el = document.createElement('li');
      el.destination = marker.line;
      el.innerHTML = marker.text+"<span>"+marker.line+"</span>";
      el.className = active_line_id >= marker.line && (next_marker && active_line_id < next_marker.line) ? marker.type+" active" : marker.type;
      el.className += marker.type == "header" ? " fh" : " fm";
      el.onmouseup = function on_mouseup(e){ left.go_to_line(e.target.destination); }
      this.el.appendChild(el);
      i += 1;
    }
  }

  this.update_markers = function()
  {
    var text = left.textarea_el.value;
    var lines = text.split("\n");
    this.markers = [];

    left.lines_count = lines.length;
    left.words_count = text.split(" ").length;
    left.chars_count = text.length;

    for(var line_id in lines){
      var line = lines[line_id];
      if(line.substr(0,2) == "# "){
        var text = line.replace("@ ","").replace("# ","");
        this.markers.push({text:text,line:line_id,type:"header"});
      }
      else if(line.substr(0,3) == "## "){
        var text = line.replace("@ ","").replace("## ","");
        this.markers.push({text:text,line:line_id,type:"note"});
      }
    }
    // End
  }

  this.update_scrollbar = function()
  {
    var scroll_distance = left.textarea_el.scrollTop;
    var scroll_max = left.textarea_el.scrollHeight - left.textarea_el.offsetHeight;
    left.scroll_el.style.height = (scroll_distance/scroll_max) * window.innerHeight;
  }
}