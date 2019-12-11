<!DOCTYPE html>
<?php
session_start();
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <title>Index - ajax</title>
</head>
<body>
    <?php if (isset($_SESSION['user']) && ($_SESSION['user']=== 'user' || $_SESSION['user'] === 'admin')): ?>
        <div class="alert alert-success h2 text-center">
        Vous êtes connecté en tant qu'
        <?php if($_SESSION['user'] === 'admin'):?>
            <span class="font-weight-bold">Admin</span>
        <?php else: ?>
            <span class="font-weight-bold">Utilisateur</span>
        <?php endif; ?>
        </div>
        <a href="deconnexion.php" class="btn btn-danger">deconnexion</a>
    <?php endif; ?>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Entrez vos identifiants de connexion</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <input type="text" name="login" id="login" class="form-control mb-3" placeholder="login">
                        <input type="password" name="password" id="password" class="form-control" placeholder="password">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn-connexion" class="btn btn-primary">Connexion</button>
                </div>
            </div>
        </div>
    </div>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Connectez vous !
    </button>
    <script src="ajax.js"></script>
</body>
</html>