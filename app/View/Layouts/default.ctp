<?php echo $this->Session->flash(); ?>

<?php echo $this->fetch('content'); ?>

<div class='testing-sqlDump'>
    <?php echo $this->element('sql_dump'); ?>
</div>