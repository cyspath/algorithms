MAX Code Collaboration with Michael

1.

function at() {
  this._key = 'passport';
  this._strategies = {};
  this._s= [];
  this._ds= [];
  this._infoTransformers = [];
  this._framework = null;
  this._userProperty = 'user';

  this.init();
}

at.prototype.use = function(name, strategy) {
  if (!strategy) {
    strategy = name;
    name = strategy.name;
  }
  if (!name) { throw new Error('Authentication strategies must have a name'); }

  this._strategies[name] = strategy;
  return this;
};

at.prototype.dsUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._ds.push(fn);
  }

  var obj = fn;

  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }

  var stack = this._ds;
  (function pass(i, err, user) {
    if ('pass' === err) {
      err = undefined;
    }
    if (err || user) { return done(err, user); }
    if (user === null || user === false) { return done(null, false); }

    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to ds user out of session'));
    }


    function ds(e, u) {
      pass(i + 1, e, u);
    }

    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, obj, deserialized);
      } else {
        layer(obj, deserialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

module.exports = at;

2.

Write a function getConfig() that, when passed parameters of an object (such as srcObject below) and a dot separated path such as "system.database.1.port" will return the value that matches that path in the array. The function should optionally accept a default value.

srcObject = {
    'system' : {
        'database' : {
              '0' : {
                'host' : '54.232.122',
                'port' : 3306
             },
              '1' : {
                'host' : '54.232.123',
                'port' : 3307
             },
              '2' : {
                'host' : '54.232.123',
             }
       }
   }
}

function getConfig(srcObject, path, default) {
    path = path.split(".");
    for (var i = 0; i < path.length; i++) {
        if (srcObject[path[i]] === undefined) {
            return default;
        } else {
            srcObject = srcObject[path[i]];
        }
    }
    return srcObject;
}

3.

You are creating a music artist application. Write the following create table definitions and queries:
• Write create statements for 3 different database tables: artist, record label, and genre. Additionally, write the create table definitions for the pivot tables.
    • The artist table should include: artist name, status (active, defunct), last release date.
    • The record label table should include label name and date founded.
    • The genre table should include genre name.
• Write 3 queries:
    • A query that shows all artists sorted by genre.
    • A query that show all record labels and includes a count of number of artists represented by the label
    • A query that shows all genres with artists counts that have over 10 artists in them

create table artists
t.text: :name
t.text: :status, default: "active"
t.datetime: :last_release_date
t.timestamps

create table record_labels
t.text: :name
t.date: :date_founded
t.timestamps

create table genres
t.text: :name
t.timestamps

create table artists_record_labels
t.integer: :artist_id
t.integer: :record_label_id
t.timestamps

create table artists_genres
t.integer: :artist_id
t.integer: :genres_id
t.timestamps

select unq(*) from artists as a join artists_genres as ag join genres as g sort by genres

select *, count(artists) from record_labels as r
join artists_record_labels as ar
where r.id = ar.record_label_id
join artists as a
where a.id = ar.artist_id
group by
r

4.

Write the jQuery code that has a single CSS multi-selector (selects 3 different element types) to:

*  Retrieve any <div> element with the id "first"
 -- also returns: ---
* Retrieve all <div> elements with the class "first"
 -- also returns: ---
* Retrieve all elements which are children of the <ol id="items"> element and whose name attribute ends with the string "first".

Then have jQuery iterate over all of the selected elements and add the CSS class "keydata" to each element.

$els = $('div#first, div.first, ol>#items[name$='first']')

$els.each(function(i, el) {
    $(el).addClass('keydata');
})
