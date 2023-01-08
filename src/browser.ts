export * from "./common"

export function download(filename:string, text:string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function getHTMLResource(id: string){
  if (!document){
      return
  }
  return document.getElementById(id)
}
export function hasHTMLResource(id: string){
  if (!document){
      return
  }
  return document.getElementById(id) ? true : false
}