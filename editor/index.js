const o = {
  cid: "",
  pageX: 0,
  pageY: 0
}, c = (t, d) => {
  if (!document || !t.content)
    throw new Error("exist error json or document not loaded");
  const s = t.content, i = [];
  if (s.forEach((n) => {
    const e = document.getElementById(n.id);
    e && i.push(e), e == null || e.addEventListener("click", () => {
      o.id = e.id, i.forEach((r) => {
        r.style.border = "", r.id === o.id && (r.style.border = "1px solid #006cff");
      });
    });
  }), d.id) {
    let n = document.getElementById(d.id);
    n && n.addEventListener("mouseover", (e) => {
      o.pageX = e.pageX, o.pageY = e.pageY, console.log("store position", o.pageX, o.pageY);
    });
  }
}, a = (t, d) => {
  c(t, d);
};
export {
  a as default
};
