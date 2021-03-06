const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(express.json());
app.use(cors());

let pageData;
let domain;
let account;

//let testURL = "https://pages.services/blog.marketmarketing.com/trackingid/";

app.get("/", (req, res0) => {

  if (req.query.url) {
    console.log(req.query.url);
    let url = req.query.url;

    try {
      axios.get(url).then((res) => {
        if (res.data) {
          console.log(res.data);
          if (res.data.includes(`_ss.push(['_setDomain', '`) > 0) {
            console.log(`we're in the search if`);
            pageData = res.data.split(`_ss.push(['_setDomain', '`)[1];
            domain = pageData.split(`']);`)[0];

            pageData = res.data.split(`_ss.push(['_setAccount', '`)[1];
            account = pageData.split(`']);`)[0];

            let obj = {
              url,
              domain,
              account,
            };

            let html = `<html>
        <head>
        <script>
              var _ss = _ss || [];
              _ss.push(['_setDomain', '${domain}']);
              _ss.push(['_setAccount', '${account}']);
              _ss.push(['_trackPageView']);
          (function() {
              var ss = document.createElement('script');
              ss.type = 'text/javascript'; ss.async = true;
              ss.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'koi-3QNJD0A8WW.marketingautomation.services/client/ss.js?ver=2.4.0';
              var scr = document.getElementsByTagName('script')[0];
              scr.parentNode.insertBefore(ss, scr);
          })();
          var callThisOnReturn = function(resp) {
              let div = document.createElement('DIV');
              document.body.appendChild(div);
                  if (resp && resp.contact) {
                        div.innerHTML = 'Name: ' + resp.contact['First Name'] + '<br><br>' + 'Email: ' + resp.contact['Email'] + '<br><br>' + 'TrackingID: ' + resp.trackingID;
                        
                  } else {
                    div.innerHTML = 'It looks like you are not being tracked on this page.';
                  }
              };
              _ss.push(['_setResponseCallback', callThisOnReturn]); 
        </script>
        </head>
        <body id="body"></body>
        </html>`;

            res0.send(html);
          } else {
            res0.send(`No tracking code found.`);
          }
        } else {
          res0.send('page not found');
        }

      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res0.send('Please include the page to check as a UTM');
  }


});

app.listen(3000, () => {
  console.log(`listening on 3000`);
});
