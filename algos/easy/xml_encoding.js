var xml = {
  tag: 1,
  attributes: { 4: 'McDowell', 5: 'CA' },
  children: [
    { tag: 2, attributes: { 3: 'Gayle' }, children: ["some message"] }
  ]
}

function xmlEncoder(xml) {
  if (typeof xml == 'string') {
    return xml;
  }

  var attr = [];
  for (var key in xml.attributes) {
    attr.push(key);
    attr.push(xml.attributes[key])
  }
  attr.push(0);

  var element = xml.tag + " " + attr.join(" ") + " ";
  xml.children.forEach(function (c) {
    element += xmlEncoder(c);
  })

  return element + " 0";
}

console.log(xmlEncoder(xml));
