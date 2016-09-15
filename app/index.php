<?php 
$base_url = "http://www.stewed.dev";
$_SERVER['REQUEST_URI_PATH'] = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', $_SERVER['REQUEST_URI_PATH']);

$lang = isset($segments[1]) ? $segments[1] : 'en';
$page = isset($segments[2]) ? $segments[2] : 'home';
$subpage = isset($segments[3]) ? $segments[3] : null;

switch ($lang) :
    case 'pt':
        include'languages/pt.php';
    break;  
    case 'en':
        include'languages/en.php';
    break;
    default:
        include'languages/en.php';
    break;
endswitch;
?>

<!doctype html>
<html lang="en">
    <head>
      <!-- head -->
      <?php include 'views/layout/head.php' ?>
    </head>
    <body>
        <!-- header -->
        <?php include 'views/layout/header.php' ?>
        <!-- <?= $page ?> -->
        <section id="main">
            <div class="content">
                <?php switch ($page) :
                    case $page:
                        include ("views/$page.php"); 
                    break;
                    default:
                        include ("views/404.php"); 
                    break;
                endswitch; ?>
            </div>
        </section>
        <!-- footer -->
        <?php include 'views/layout/footer.php' ?>
        <!-- scripts -->
        <?php include 'views/layout/scripts.php' ?>
    </body>
</html>
