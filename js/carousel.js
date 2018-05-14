var arrayDeObjetos = [];
var projectsInfo;
 var init = function(){

      var carousel = document.getElementById('carousel'),
          navButtons = document.querySelectorAll('#navigation span'),
          panelCount =  3,//carousel.children.length,
          theta = 0,
          panelWitdh = 210,
          r = (panelWitdh/2)/Math.tan(((360/2)/panelCount)*Math.PI/180);

      var onNavButtonClick = function (event){
            var increment = parseInt(event.currentTarget.getAttribute('data-increment'));
            theta += ( 360 / panelCount ) * increment; 
            carousel.style.transform = 'translateZ(-' + r + 'px) rotateY(' + theta + 'deg)';
            console.log("r: ", r)
      console.log("theta: ", theta)
      console.log("panelCount: ", panelCount)
          };

      //Triggers
      for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      }
      $("#carousel").on('click','figure.card', function() {
        var id = parseInt($(this)[0].id);
        arrayDeObjetos[id].showModal();
      })




var requestURL = 'json/projects.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();




request.onload = function() {
  projectsInfo = request.response;
  console.log('projectsInfo ', projectsInfo);

  class Card {
    constructor (header, body, footer, modalNumber, modalWindow){
      this.header = header;
      this.body = body;
      this.footer = footer;
      this.modal = modalNumber;
      this.modalWindow = modalWindow;
    }

    render() {
      $('#carousel').append("<figure id='" + this.modal + "' class='card'><a href='#modal'>" + this.header + this.body + this.footer + "</a></figure>");
    }

    showModal() {
      $('#modal .modalbox').empty().append(this.modalWindow);
      
      (function($) {
    $(function() {
        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var carousel = $(this),
                width = carousel.innerWidth();
                console.log("width... ", width);
                if (width >= 600) {
                    width = width / 2;
                } else if (width >= 380) {
                    width = width / 1;
                } else {
                    width = 380;
                }
                console.log("width... after ", width);
                carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
            })
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });
        $('.jcarousel-pagination')
          .on('jcarouselpagination:active', 'a', function() {
              $(this).addClass('active');
          })
          .on('jcarouselpagination:inactive', 'a', function() {
              $(this).removeClass('active');
          })
          .on('click', function(e) {
              e.preventDefault();
          })
          .jcarouselPagination({
              perPage: 1,
              item: function(page) {
                  return '<a href="#' + page + '">' + page + '</a>';
              }
          });
    });
})(jQuery);
    }

    addIconTechnologies (projectN) {
      for (let n = projectsInfo[projectN]['technologies'].length - 1; n >= 0; n--) {
              let tpmlIcons = projectsInfo[projectN]['technologies'][n]['name'];
              console.log(tpmlIcons);

              $('#technicalIcons' + projectsInfo[projectN]['id'])
              .append("<img title='" + projectsInfo[projectN]['technologies'][n]['name'] + 
                        "' src='" + projectsInfo[projectN]['technologies'][n]['icon'] + "'>");     
      }
    }
  }

  
  for (let i = 0; i <= projectsInfo.length; i++) {
  
    let tpmlHeader = "<header>" +
            "<div>" +
              // "<a href=" + "'" + projectsInfo[i]['github'] + "' " + "target='_blank'>" +
              //         "<span class='gitIcon'>" +
              //           "<i class='fab fa-github-square fa-2x'></i>" +
              //         "</span>" +
              //       "</a>" +
              //         "<a href=" + "'" + projectsInfo[i]['deploy'] + "' " + "target='_blank'>" +
                      "<span class='uptitle'>" +
                        "project name:" + 
                      "</span>" +
                      "<span class='title'>" +
                        "<strong class='stroke'>" + projectsInfo[i]['title'] + "</strong>" +
                      "</span>" +
            "</div>" +
          "</header>";

    let tpmlBody = "<article>" +
              projectsInfo[i]['description'] +
                  "<span class='endArticle'>" +
                    "<i class='fas fa-eye'></i>" +
                  "</span>" +
            "</article>";
              // "</a>"


    let tpmlFooter = "<footer>" +
                /*"<span class='linkedinIcon'>" +
                  "<a href='https://uk.linkedin.com/in/pacotiger' target='_blank' title='LinkedIn'>" +
                    "<i class='fab fa-linkedin fa-2x'></i>" +
                  "</a>" +
                "</span>" +*/
               
                "<span class='technicalIcons' id='technicalIcons" + projectsInfo[i]['id'] + "'>" +        
                "</span>" +
          "</footer>";

    let modalWindow = "<a href='#close' title='Close' class='close'>X</a>" +
                      "<p>" + projectsInfo[i]['title'] + "</p>" +

                      "<div class='jcarousel-wrapper'>" +
                      "<div class='jcarousel'>" +
                          "<ul>" +
                              "<li><img src='img/" + projectsInfo[i]["img"][0] + "'  alt=''></li>" +
                              "<li><img src='img/" + projectsInfo[i]["img"][1] + "'  alt=''></li>" +
                              "<li><img src='img/" + projectsInfo[i]["img"][2] + "'  alt=''></li>" +
                          "</ul>" +
                      "</div>" +

                      "<a href='#' class='jcarousel-control-prev'>&lsaquo;</a>" +
                      "<a href='#' class='jcarousel-control-next'>&rsaquo;</a>";
    
    //Generate dinamic variable 'card_1', 'card_2' as an object instance....
    eval("var card_" + projectsInfo[i]['id'] + " = new Card(tpmlHeader, tpmlBody, tpmlFooter, i, modalWindow);");
    arrayDeObjetos.push(eval("card_" + i));
    //card_X.render()
    eval("card_" + projectsInfo[i]['id'] + ".render();");

    //card_X.addIconTechnologies()
    eval("card_" + projectsInfo[i]['id'] + ".addIconTechnologies(i);");
  } 

};

};

init();

