angular.module('myApp').controller('gamescontrol', function($scope, $http) {




    $http.get('parts/games/empire.json')
        .success(function(data) {
            console.log('success');
            $scope.game = data.empire;
            console.log(game);
        })



    //end of empire





    $(document).ready(function() {
        $body = $('.question').attr('id');

        cq = 0;
        $quest = $('#questions');
        $img = $('.ruleimg');
        $an1 = $('#answer1');
        $an2 = $('#answer2');
        $an3 = $('#answer3');
        $an4 = $('#answer4');
        // end oof config 
        score = 0;

        $quest.text(empire[cq].question);
        $img.attr('src', empire[cq].img);
        $an1.text(empire[cq].choices[0]);
        $an2.text(empire[cq].choices[1]);
        $an3.text(empire[cq].choices[2]);
        $an4.text(empire[cq].choices[3]);

        // first answers
        $an1.attr('value', empire[cq].value[0]);
        $an2.attr('value', empire[cq].value[1]);
        $an3.attr('value', empire[cq].value[2]);
        $an4.attr('value', empire[cq].value[3]);
        //adding attributes
        $('.an').on('click', function(e) {
            $target = $(e.target).attr('value');
            score = score + Number($target);
            console.log(score);
            cq++;
            if (cq <= 5) {

                $quest.text(empire[cq].question);
                $img.attr('src', empire[cq].img);
                $an1.text(empire[cq].choices[0]);
                $an2.text(empire[cq].choices[1]);
                $an3.text(empire[cq].choices[2]);
                $an4.text(empire[cq].choices[3]);
                $an1.attr('value', empire[cq].value[0]);
                $an2.attr('value', empire[cq].value[1]);
                $an3.attr('value', empire[cq].value[2]);
                $an4.attr('value', empire[cq].value[3]);

            } else {
                check(score);
                cq = 0;
            }

            function check(score) {
                $(".question").css('display', 'none');
                $('.your').css("display", "block");
                $('body').scrollTop(1000);

                if (score >= 20) {

                    $('#youare').text(winner[4].title);
                    $('#hero').attr('src', winner[4].img);
                    $('#youre').text(winner[4].text);
                } else if (score >= 17) {

                    $('#youare').text(winner[0].title);
                    $('#hero').attr('src', winner[0].img);
                    $('#youre').text(winner[0].text);
                } else if (score >= 14) {

                    $('#youare').text(winner[1].title);
                    $('#hero').attr('src', winner[1].img);
                    $('#youre').text(winner[1].text);
                } else if (score >= 11) {

                    $('#youare').text(winner[3].title);
                    $('#hero').attr('src', winner[3].img);
                    $('#youre').text(winner[3].text);
                } else if (score >= 8) {

                    $('#youare').text(winner[5].title);
                    $('#hero').attr('src', winner[5].img);
                    $('#youre').text(winner[5].text);
                } else {

                    $('#youare').text(winner[2].title);
                    $('#hero').attr('src', winner[2].img);
                    $('#youre').text(winner[2].text);
                }
            }
        });



    })

});