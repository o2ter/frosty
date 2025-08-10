//
//  render.ts
//
//  The MIT License
//  Copyright (c) 2021 - 2025 O2ter Limited. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import _ from 'lodash';
import { ServerDOMRenderer } from 'frosty/server-dom';
import { JSDOM, CookieJar, ResourceLoader } from 'jsdom';

class NoOpResourceLoader extends ResourceLoader {
  fetch(url, options) { return null; }
}

export const renderToHTML = async (App, {
  request: req,
  response: res,
  jsSrc,
  cssSrc,
}) => {
  const referrer = req.get('Referrer');
  const userAgent = req.get('User-Agent');
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const cookieJar = new CookieJar();
  for (const cookie of _.split(req.get('cookie'), ';')) {
    cookieJar.setCookieSync(cookie, url);
  }
  const loader = new NoOpResourceLoader({ userAgent });
  const dom = new JSDOM(undefined, { url, referrer, userAgent, resources: loader, cookieJar });
  const renderer = new ServerDOMRenderer(dom);
  res.setHeader('Content-Type', 'text/html');
  res.send(await renderer.renderToString(
    <html>
      <head>
        <script src={jsSrc} defer />
        {cssSrc && <link rel='stylesheet' type='text/css' href={cssSrc} />}
      </head>
      <body>
        <div id="root"><App /></div>
      </body>
    </html>
  ));
}