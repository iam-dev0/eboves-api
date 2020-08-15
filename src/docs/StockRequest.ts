import Outlets from "#root/models/Outlets";

const row = (variations) => {
  return `${variations.map((v,index) => {
    return `  <tr>
   <td class="service">${index}</td>
   <td class="desc">${v.name}</td>
   <td class="unit">${v.requestedPrice}</td>
   <td class="qty">${v.requestedQuantity}</td>
   <td class="total">${v.requestedQuantity * v.requestedPrice}</td>
 </tr>`;
  })}`;
};

const template = ({ orderNumber, createdAt, supplier, outlet, variations }:any) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="utf-8">
    <title>Example 1</title>
    <link rel="stylesheet" href="style.css" media="all" />
    <style>
      .clearfix:after {
        content: "";
        display: table;
        clear: both;
      }
  
      a {
        color: #5D6975;
        text-decoration: underline;
      }
  
      body {
        position: relative;
        width: 21cm;
        height: 29.7cm;
        margin: 0 auto;
        color: #001028;
        background: #FFFFFF;
        font-family: Arial, sans-serif;
        font-size: 12px;
        font-family: Arial;
      }
  
      header {
        padding: 10px 0;
        margin-bottom: 30px;
      }
  
      #logo {
        text-align: left;
        margin-bottom: 10px;
      }
  
      #logo img {
        width: 90px;
      }
  
      h1 {
        border-top: 1px solid #5D6975;
        border-bottom: 1px solid #5D6975;
        color: #5D6975;
        font-size: 2.4em;
        line-height: 1.4em;
        font-weight: normal;
        text-align: center;
        margin: 0 0 20px 0;
        background: url(dimension.png);
      }
  
      #project {
        float: left;
      }
  
      #project span {
        color: #5D6975;
        text-align: right;
        width: 52px;
        margin-right: 10px;
        display: inline-block;
        font-size: 0.8em;
      }
  
      #company {
        float: right;
        text-align: right;
      }
  
      #project div,
      #company div {
        white-space: nowrap;
      }
  
      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 20px;
      }
  
      table tr:nth-child(2n-1) td {
        background: #F5F5F5;
      }
  
      table th,
      table td {
        text-align: right;
      }
  
      table th {
        padding: 5px 20px;
        color: #5D6975;
        border-bottom: 1px solid #C1CED9;
        white-space: nowrap;
        font-weight: normal;
      }
  
      table .service,
      table .desc {
        text-align: left;
      }
  
      table td {
        padding: 20px;
        text-align: right;
      }
  
      table td.service,
      table td.desc {
        vertical-align: top;
      }
  
      table td.unit,
      table td.qty,
      table td.total {
        font-size: 1.2em;
      }
  
      table td.grand {
        border-top: 1px solid #5D6975;
        ;
      }
  
      #notices .notice {
        color: #5D6975;
        font-size: 1.2em;
      }
  
      footer {
        color: #5D6975;
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #C1CED9;
        padding: 8px 0;
        text-align: center;
      }
    </style>
  </head>
  
  <body>
    <header class="clearfix">
      <div id="logo">
        <img src="http://localhost:4040/images/logo.png">
      </div>
      <hr />
      <div id="company" class="clearfix">
        <div>Eboves</div>
        <div>www.eboves.com</div>
        <div>0340 8704981</div>
        <div><a href="mailto:admin@eboves.com">admin@eboves.com</a></div>
      </div>
      <div id="project">
        <h4><span>Order NO :</span>${orderNumber}</h4>
        <div><span>Supplier :</span>${supplier.name}</div>
        <div><span>Deliver to :</span>Eboves - ${outlet.name}</div>
        <div><span>DATE :</span>${createdAt}</div>
  
      </div>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th class="service">Sr. NO</th>
            <th class="desc">Name</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
        ${row(variations)}
        </tbody>
      </table>
    </main>
    <footer>
      Invoice was created on a computer and is valid without the signature and seal.
    </footer>
  </body>
  
  </html>
    `;
};

export default template;
