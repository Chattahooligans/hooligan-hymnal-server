Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  # bootstrap should contain most of the OS-level config like installing packages
  config.vm.provision :shell, path: "vagrant-bootstrap.sh"
  # bootstrap-private contains secret environment variables and should be secret!
  config.vm.provision :shell, path: "vagrant-bootstrap-private.sh"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
end
