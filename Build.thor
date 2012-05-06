class Build < Thor
    #list of files to be merged
    FILES = [
        "headComments.js",
        "global.js",
        "object.js",
        "container.js",
        "panel.js",
        "button.js",
        "window.js"
    ]

    desc "development", "Merge javascript files from ./src directory into ./library/xkanvas-souce-VERSION.js"
    def development(version)
        version ||= "1.0"
        fileName = "library/xkanvas-souce-#{version}.js"

        puts "# Empty folder ./library"
        Dir.foreach("library") do |file|
          if file.match(/.*\.js/)
            File.delete("library/" + file)
          end
        end

        puts "# Creating new source file"
        File.open(fileName, "w") do |file|
            file.puts concatenate(version)
        end 
        puts "# Success!!! :)"

    end

    private
    def concatenate(version)
      date ||= Time.now.strftime("%b %d %Y")
      content = ""
      FILES.each do |file|
        content << IO.read(File.expand_path("src/#{file}")) << "\n"
      end
      
      # Add the version number
      content.sub!("@version", version)
      
      return content
    end
end
