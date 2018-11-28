using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace NewsDownloader.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public String GetNews()
        {
            var sr = new StreamReader(AppDomain.CurrentDomain.BaseDirectory + @"/JSON/news-headlines.json");
            var result = sr.ReadToEnd();
            return result;
        }
        public ActionResult MySpace()
        {
            return View();
        }
    }
}
