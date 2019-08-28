FROM circleci/node:12.9-browsers

RUN sudo dpkg --add-architecture i386
RUN whoami
RUN wget -nc https://dl.winehq.org/wine-builds/winehq.key -O $HOME/winehq.key
RUN sudo apt-key add $HOME/winehq.key
RUN sudo sh -c 'echo "deb https://dl.winehq.org/wine-builds/debian/ stretch main"  >> /etc/apt/sources.list.d/wine.list'
RUN sudo apt install apt-transport-https
RUN sudo apt update
RUN sudo apt install --install-recommends winehq-stable
RUN echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | sudo debconf-set-selections
RUN sudo apt-get install -y wine
