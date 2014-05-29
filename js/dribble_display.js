/*
 * Description: Displays content like dribble.com using json data. Endless scrolling implementated.
 * author: Sathyanarayana sastry chamarthi
 * website: sathyanarayanasastry@gmail.com
 * 
 */
 // Plugin init using self-invoke
 
 /***
 #####  Last id is stored as 
 #####
 #####
 ****/
 (function(){
	$.fn.dribbleGrid = function(options) {
		var dribbleGrid  = dribbleGrid || {};
		
		dribbleGrid.settings = $.extend({
			templateId: "dribbleTemplate",
			url: '/api/data.json',
			elem: $(this)
		},options);
		
		dribbleGrid.bind = function(){
			console.log('bind'); 
			$(this).trigger('dribbleBound');
			$(window).scroll(function() {
			   if($(window).scrollTop() + $(window).height() == $(document).height()) {
				   dribbleGrid.preapre();
			   }
			});
		}
		
		dribbleGrid.preapre = function(){ 
			console.log('prepared'); 
			$(this).trigger('dribblePrepared');
			var lastBoxId = $(dribbleGrid.settings.elem).data('lastId'); 
			lastBoxId = (typeof lastBoxId == "undefined") ? lastBoxId = 0 : lastBoxId; 
			
			$.ajax({
				url: dribbleGrid.settings.url+"?lastId="+lastBoxId,
				dataType: 'json',
				success: function(data){
					$(dribbleGrid.settings.elem).data('lastId',data.lastId);
					$("#"+dribbleGrid.template()).tmpl(data).appendTo(dribbleGrid.settings.elem);
					$(this).trigger('dribbleReady');
				}
			});
		}
		
		dribbleGrid.init = function(){ 
			dribbleGrid.bind(); 
			$(this).trigger('dribbleInit'); 
			dribbleGrid.preapre();
		}	
		
		dribbleGrid.template = function(){ 
			return dribbleGrid.settings.templateId; 
		}			
		dribbleGrid.init();
	}
 })(jQuery);
 



 
// Data generation follows - should be deleted once integrated
var boxObj = {
	lastId: 34,
    author: "Shastry Chamarthi",
	profilePic: "https://d13yacurqjgara.cloudfront.net/users/28076/screenshots/1571147/elevate_1x.png",
	authorCredentials: "Team",
    isPro: 1,
    poster: {
        src: "https://d13yacurqjgara.cloudfront.net/users/28076/screenshots/1571147/elevate_1x.png",
        alt: "Test image",
    },
    info: {
        title: "adfsa",
        description: "asdfa fasf afas fdas fasf",
        date: "27 Mar, 2014",
    },
    extras: {
        stats: {
            fans: 18,
            views: 232,
            comments: 34
        },
        links: {
            hasAttachment: true,
            isRebound: false,
            hasReboundUrl: true,
            reboundUrl: "http://google.com", 
        }

    }
}
var blogPosts = [];
for(i=0;i<6;i++) { 
	var newBox = $.extend({},boxObj); 
	newBox.isPro = Math.round(Math.random());  
	blogPosts.push(newBox); 
}
$.mockjax({
  url: '/api/*',
  responseTime: 750,
  responseText: blogPosts
});
//$("#dribbleTemplate").tmpl(blogPosts).appendTo(".primary");
 /*
            var blogPosts = [
                {
                    postTitle: "How to fix a sink plunger in 5 minutes",
                    postEntry: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    categories: ["HowTo", "Sinks", "Plumbing"]
                },
                {
                    postTitle: "How to remove a broken lightbulb",
                    postEntry: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    categories: ["HowTo", "Lightbulbs", "Electricity"]
                },
                {
                    postTitle: "New associate website",
                    postEntry: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna."
                },
				{
                    postTitle: "How to fix a sink plunger in 5 minutes",
                    postEntry: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    categories: ["HowTo", "Sinks", "Plumbing"]
                },
                {
                    postTitle: "How to remove a broken lightbulb",
                    postEntry: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    categories: ["HowTo", "Lightbulbs", "Electricity"]
                },
                {
                    postTitle: "New associate website",
                    postEntry: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna."
                }
            ];
 */
            // Render the blog posts
           
 
 