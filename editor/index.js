const n = {
  cid: "",
  pageX: 0,
  pageY: 0
};
function c(o = 1e3) {
  return new Promise((t) => {
    setTimeout(() => {
      t();
    }, o);
  });
}
const a = async (o, t) => {
  if (!document || !o.content)
    throw new Error("exist error json or document not loaded");
  await c(0);
  const s = o.content, r = [];
  if (s.forEach((d) => {
    const e = document.getElementById(d.id);
    console.log(e, d.id), e && r.push(e), e == null || e.addEventListener("click", () => {
      n.cid = e.id, r.forEach((i) => {
        i.style.border = "", i.id === n.cid && (i.style.border = "1px solid #006cff");
      });
    });
  }), t.id) {
    let d = document.getElementById(t.id);
    d && d.addEventListener("mouseover", (e) => {
      n.pageX = e.pageX, n.pageY = e.pageY, console.log("store position", n.pageX, n.pageY);
    });
  }
}, l = (o, t) => {
  a(o, t);
};
export {
  l as default
};
