const n = {
  cid: ""
}, s = (t) => {
  if (!document || !t.content)
    throw new Error("exist error json or document not loaded");
  const r = t.content, e = [];
  r.forEach((c) => {
    const o = document.getElementById(c.id);
    o && e.push(o), o == null || o.addEventListener("click", () => {
      n.id = o.id, e.forEach((d) => {
        d.style.border = "", d.id === n.id && (d.style.border = "1px solid #006cff");
      });
    });
  });
}, i = (t) => {
  s(t);
};
export {
  i as default
};
